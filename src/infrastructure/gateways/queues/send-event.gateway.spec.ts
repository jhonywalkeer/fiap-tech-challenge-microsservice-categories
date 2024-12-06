import { SendMessagesProducer } from '@application/queues/producers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { SendEventGateway } from '@infrastructure/gateways/queues'

describe('SendEventGateway', () => {
  let sendEventGateway: SendEventGateway
  let sendMessagesProducer: jest.Mocked<SendMessagesProducer>
  let logger: jest.SpyInstance

  beforeEach(() => {
    sendMessagesProducer = {
      execute: jest.fn()
    } as unknown as jest.Mocked<SendMessagesProducer>
    sendEventGateway = new SendEventGateway(sendMessagesProducer)
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log the event queue name and call sendEvent.execute with the event', async () => {
    const event: QueueParams = { queue: 'test-queue', message: 'test-message' }
    sendMessagesProducer.execute.mockResolvedValue(true)

    const result = await sendEventGateway.execute(event)

    expect(logger).toHaveBeenCalledWith(
      '[SendEventGateway.execute]: test-queue'
    )
    expect(sendMessagesProducer.execute).toHaveBeenCalledWith(event)
    expect(result).toBe(true)
  })

  it('should handle errors thrown by sendEvent.execute', async () => {
    const event: QueueParams = { queue: 'test-queue', message: 'test-message' }
    const error = new Error('test error')
    sendMessagesProducer.execute.mockRejectedValue(error)

    await expect(sendEventGateway.execute(event)).rejects.toThrow('test error')
    expect(logger).toHaveBeenCalledWith(
      '[SendEventGateway.execute]: test-queue'
    )
    expect(sendMessagesProducer.execute).toHaveBeenCalledWith(event)
  })
})
