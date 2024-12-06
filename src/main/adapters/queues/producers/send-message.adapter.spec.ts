import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandOutput
} from '@aws-sdk/client-sqs'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { QueueParamsMock, SendMessageMock } from '@mocks/queue.mock'

jest.mock('@infrastructure/providers/queues', () => ({
  ConnectQueueProvider: jest.fn()
}))

jest.mock('@common/utils/loggers', () => ({
  Logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}))

jest.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: jest.fn().mockImplementation(() => ({
    send: jest.fn()
  })),
  SendMessageCommand: jest.fn()
}))

describe('[Adapters] Send Message Adapter', () => {
  let sendMessageAdapter: SendMessageAdapter
  let client: SQSClient

  beforeEach(() => {
    client = {
      send: jest.fn()
    } as unknown as SQSClient
    ;(ConnectQueueProvider as jest.Mock).mockReturnValue(client)

    sendMessageAdapter = new SendMessageAdapter()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the send method with the correct parameters and return message ID', async () => {
    const params: QueueParams = QueueParamsMock
    const sqsClient = client.send as jest.Mock
    const sendMessageOutput: SendMessageCommandOutput = SendMessageMock

    sqsClient.mockResolvedValue(sendMessageOutput)

    const result = await sendMessageAdapter.execute(params)

    expect(Logger.info).toHaveBeenCalledWith(
      '[SendMessageAdapter.send] Queue: https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'
    )

    expect(SendMessageCommand).toHaveBeenCalledWith({
      QueueUrl: params.queue,
      MessageBody: params.message
    })

    expect(result).toEqual(true)
  })
})
