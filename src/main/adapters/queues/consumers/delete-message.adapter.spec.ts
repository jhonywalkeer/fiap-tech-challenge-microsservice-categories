import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'
import { DeleteMessageAdapter } from '@main/adapters/queues/consumers'
import { QueueParamsMock } from '@mocks/queue.mock'

jest.mock('@infrastructure/providers/queues', () => ({
  ConnectQueueProvider: jest.fn()
}))
jest.mock('@common/utils/loggers', () => ({
  Logger: {
    info: jest.fn()
  }
}))
jest.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: jest.fn(),
  DeleteMessageCommand: jest.fn()
}))

describe('[Adapters] Delete Message Adapter', () => {
  let deleteMessageAdapter: DeleteMessageAdapter
  let mockClient: SQSClient

  beforeEach(() => {
    mockClient = {
      send: jest.fn()
    } as unknown as SQSClient
    ;(ConnectQueueProvider as jest.Mock).mockReturnValue(mockClient)

    deleteMessageAdapter = new DeleteMessageAdapter()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the send method with the correct parameters', async () => {
    const params: QueueParams = QueueParamsMock

    await deleteMessageAdapter.execute(params)

    expect(Logger.info).toHaveBeenCalledWith(
      '[DeleteMessageAdapter.delete]: message-id-example'
    )
    expect(DeleteMessageCommand).toHaveBeenCalledWith({
      QueueUrl: params.queue,
      ReceiptHandle: params.receipt_handle
    })
    expect(mockClient.send).toHaveBeenCalledWith(
      expect.any(DeleteMessageCommand)
    )
  })
})
