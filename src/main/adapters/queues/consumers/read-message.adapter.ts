import { ReadMessagesConsumer } from '@application/queues/consumers'
import {
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  ReceiveMessageRequest,
  SQSClient
} from '@aws-sdk/client-sqs'
import { Queue, QueueAttributeName } from '@common/constants'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ConnectQueueProvider } from '@infrastructure/providers/queues'

export class ReadMessageAdapter implements ReadMessagesConsumer {
  private readonly client: SQSClient
  constructor() {
    this.client = ConnectQueueProvider()
  }

  async execute(params: QueueParams): Promise<any> {
    const input: ReceiveMessageRequest = {
      QueueUrl: params.queue,
      MaxNumberOfMessages: Queue.MaxNumberOfMessages,
      WaitTimeSeconds: Queue.WaitTimeSeconds,
      AttributeNames: [QueueAttributeName]
    }
    const command: ReceiveMessageCommand = new ReceiveMessageCommand(input)
    const messages: ReceiveMessageCommandOutput =
      await this.client.send(command)

    if (messages?.Messages) {
      Logger.info(`[ReadMessageAdapter.read] Queue: ${params.queue}`)
      return messages.Messages[0].Body
        ? JSON.parse(messages.Messages[0].Body)
        : null
    }

    return null
  }
}
