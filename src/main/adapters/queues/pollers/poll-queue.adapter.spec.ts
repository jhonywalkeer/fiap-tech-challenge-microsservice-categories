import {
  DeleteMessagesConsumer,
  ReadMessagesConsumer
} from '@application/queues/consumers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { PollQueueAdapter } from '@main/adapters/queues/pollers'
import sinon from 'sinon'

jest.mock('@application/queues/consumers', () => ({
  DeleteMessagesConsumer: jest.fn(),
  ReadMessagesConsumer: jest.fn()
}))

jest.mock('@common/utils/loggers', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }
}))

jest.mock('@main/factories/trigger', () => ({
  TriggerUCFactory: {
    execute: jest.fn()
  }
}))

describe('PollQueueAdapter', () => {
  let readMessages: ReadMessagesConsumer
  let deleteMessages: DeleteMessagesConsumer
  let pollQueueAdapter: PollQueueAdapter
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    readMessages = {
      execute: jest.fn()
    }
    deleteMessages = {
      execute: jest.fn()
    }
    pollQueueAdapter = new PollQueueAdapter(readMessages, deleteMessages)
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
    jest.restoreAllMocks()
  })

  it('should process messages and delete them', async () => {
    const params: QueueParams = { queue: 'test-queue' }
    const messages = {
      Messages: [
        {
          Body: JSON.stringify({ test: 'message1' }),
          ReceiptHandle: 'handle1'
        },
        { Body: JSON.stringify({ test: 'message2' }), ReceiptHandle: 'handle2' }
      ]
    }

    ;(readMessages.execute as jest.Mock).mockResolvedValueOnce(messages)
    ;(deleteMessages.execute as jest.Mock).mockResolvedValueOnce(undefined)

    const executeSpy = jest.spyOn(pollQueueAdapter, 'execute')
    const executePromise = pollQueueAdapter.execute(params)

    clock.tick(10000)
    await executePromise

    expect(readMessages.execute).toHaveBeenCalledWith(params)
    expect(deleteMessages.execute).toHaveBeenCalledTimes(2)
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('should timeout after 10 seconds', async () => {
    const params: QueueParams = { queue: 'test-queue' }

    ;(readMessages.execute as jest.Mock).mockResolvedValueOnce({ Messages: [] })

    const executeSpy = jest.spyOn(pollQueueAdapter, 'execute')
    const executePromise = pollQueueAdapter.execute(params)
    clock.tick(10000)

    await executePromise

    expect(Logger.warn).toHaveBeenCalledWith(
      '[PollQueueAdapter.execute] Polling timed out.'
    )
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('should continue polling after timeout', async () => {
    const params: QueueParams = { queue: 'test-queue' }

    ;(readMessages.execute as jest.Mock).mockResolvedValueOnce({ Messages: [] })

    const executeSpy = jest.spyOn(pollQueueAdapter, 'execute')
    const executePromise = pollQueueAdapter.execute(params)
    clock.tick(10000)

    await executePromise

    expect(Logger.warn).toHaveBeenCalledWith(
      '[PollQueueAdapter.execute] Polling timed out.'
    )
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })

  it('should log error when message processing fails', async () => {
    const params: QueueParams = { queue: 'test-queue' }
    const messages = {
      Messages: [
        {
          Body: JSON.stringify({ test: 'message1' }),
          ReceiptHandle: 'handle1'
        }
      ]
    }

    ;(readMessages.execute as jest.Mock).mockResolvedValueOnce(messages)
    ;(deleteMessages.execute as jest.Mock).mockRejectedValueOnce(
      new Error('Delete failed')
    )

    const executeSpy = jest.spyOn(pollQueueAdapter, 'execute')
    const executePromise = pollQueueAdapter.execute(params)
    clock.tick(10000)

    await executePromise

    expect(Logger.warn).toHaveBeenCalledWith(
      '[PollQueueAdapter.execute] Polling timed out.'
    )
    expect(executeSpy).toHaveBeenCalledTimes(1)
  })
})
