import { ReadMessagesConsumer } from '@application/queues/consumers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ReceiveEventGateway } from '@infrastructure/gateways/queues'

describe('[Gateways] Receive Event Gateway', () => {
  let receiveEventGateway: ReceiveEventGateway
  let readMessagesConsumer: jest.Mocked<ReadMessagesConsumer>
  let logger: jest.SpyInstance

  beforeEach(() => {
    readMessagesConsumer = {
      execute: jest.fn()
    } as unknown as jest.Mocked<ReadMessagesConsumer>
    receiveEventGateway = new ReceiveEventGateway(readMessagesConsumer)
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log the event queue name and call readEvent.execute with the event', async () => {
    const event: QueueParams = { queue: 'test-queue', message: 'test-message' }
    readMessagesConsumer.execute.mockResolvedValue('result')

    const result = await receiveEventGateway.execute(event)

    expect(logger).toHaveBeenCalledWith(
      '[SendEventGateway.execute]: test-queue'
    )
    expect(readMessagesConsumer.execute).toHaveBeenCalledWith(event)
    expect(result).toBe('result')
  })

  it('should handle errors thrown by readEvent.execute', async () => {
    const event: QueueParams = { queue: 'test-queue', message: 'test-message' }
    const error = new Error('test error')
    readMessagesConsumer.execute.mockRejectedValue(error)

    await expect(receiveEventGateway.execute(event)).rejects.toThrow(
      'test error'
    )
    expect(logger).toHaveBeenCalledWith(
      '[SendEventGateway.execute]: test-queue'
    )
    expect(readMessagesConsumer.execute).toHaveBeenCalledWith(event)
  })
})
