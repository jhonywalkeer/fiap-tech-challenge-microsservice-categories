import { QueuePoll } from '@application/queues/pollers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { PollEventGateway } from '@infrastructure/gateways/queues'

describe('[Gateways] PollEvent Gateway', () => {
  let pollEventGateway: PollEventGateway
  let queuePoll: jest.Mocked<QueuePoll>
  let logger: jest.SpyInstance

  beforeEach(() => {
    queuePoll = {
      execute: jest.fn()
    } as unknown as jest.Mocked<QueuePoll>

    pollEventGateway = new PollEventGateway(queuePoll)
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log the event queue name and call readEvent.execute with the event', async () => {
    const event: QueueParams = { queue: 'test-queue' }
    queuePoll.execute.mockResolvedValue()

    await pollEventGateway.execute(event)

    expect(logger).toHaveBeenCalledWith(
      '[PollEventGateway.execute]: test-queue'
    )
    expect(queuePoll.execute).toHaveBeenCalledWith(event)
  })

  it('should handle errors thrown by readEvent.execute', async () => {
    const event: QueueParams = { queue: 'test-queue', message: 'test-message' }
    const error = new Error('test error')
    queuePoll.execute.mockRejectedValue(error)

    await expect(pollEventGateway.execute(event)).rejects.toThrow('test error')

    expect(logger).toHaveBeenCalledWith(
      '[PollEventGateway.execute]: test-queue'
    )
    expect(queuePoll.execute).toHaveBeenCalledWith(event)
  })
})
