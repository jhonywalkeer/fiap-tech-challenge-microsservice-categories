import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs'
import { Queue, QueueAttributeName } from '@common/constants'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'
import { ReadMessageAdapter } from '@main/adapters/queues/consumers'
import {
  QueueParamsMock,
  ReceiveEmptyMessageOutput,
  ReceiveMessageOutput
} from '@mocks/queue.mock'

jest.mock('@infrastructure/providers/queues', () => ({
  ConnectQueueProvider: jest.fn()
}))

jest.mock('@common/utils/loggers', () => ({
  Logger: {
    info: jest.fn()
  }
}))

jest.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: jest.fn().mockImplementation(() => ({
    send: jest.fn()
  })),
  ReceiveMessageCommand: jest.fn()
}))

describe('[Adapters] Read Message Adapter', () => {
  let readMessageAdapter: ReadMessageAdapter
  let client: SQSClient

  beforeEach(() => {
    client = {
      send: jest.fn()
    } as unknown as SQSClient
    ;(ConnectQueueProvider as jest.Mock).mockReturnValue(client)

    readMessageAdapter = new ReadMessageAdapter()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the send method with the correct parameters and return messages', async () => {
    const params: QueueParams = QueueParamsMock
    const sqsClient = client.send as jest.Mock

    sqsClient.mockResolvedValue(ReceiveMessageOutput)

    const result = await readMessageAdapter.execute(params)

    expect(Logger.info).toHaveBeenCalledWith(
      '[ReadMessageAdapter.read] Queue: https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'
    )

    expect(ReceiveMessageCommand).toHaveBeenCalledWith({
      QueueUrl: params.queue,
      MaxNumberOfMessages: Queue.MaxNumberOfMessages,
      WaitTimeSeconds: Queue.WaitTimeSeconds,
      AttributeNames: [QueueAttributeName]
    })

    expect(result).toEqual(ReceiveMessageOutput.Messages)
  })

  it('should return null when there are no messages', async () => {
    const params: QueueParams = QueueParamsMock
    const sqsClient = client.send as jest.Mock

    sqsClient.mockResolvedValue(ReceiveEmptyMessageOutput)

    const result = await readMessageAdapter.execute(params)

    expect(ReceiveMessageCommand).toHaveBeenCalledWith({
      QueueUrl: params.queue,
      MaxNumberOfMessages: Queue.MaxNumberOfMessages,
      WaitTimeSeconds: Queue.WaitTimeSeconds,
      AttributeNames: [QueueAttributeName]
    })

    expect(result).toBeNull()
  })
})
