import {
  DeleteMessagesConsumer,
  ReadMessagesConsumer
} from '@application/queues/consumers'
import { QueuePoll } from '@application/queues/pollers'
import { ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs'
import { Queue } from '@common/constants'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { TriggerUCFactory } from '@main/factories/trigger'

export class PollQueueAdapter implements QueuePoll {
  private readMessages: ReadMessagesConsumer
  private deleteMessages: DeleteMessagesConsumer

  constructor(
    readMessages: ReadMessagesConsumer,
    deleteMessages: DeleteMessagesConsumer
  ) {
    this.readMessages = readMessages
    this.deleteMessages = deleteMessages
  }

  async execute(params: QueueParams): Promise<void> {
    let hasMessages = true
    const timeout = 10000
    const startTime = Date.now()

    while (hasMessages && Date.now() - startTime < timeout) {
      Logger.info(`[PollQueueAdapter.execute] Queue: ${params.queue}`)
      const messages: ReceiveMessageCommandOutput =
        await this.readMessages.execute(params)

      if (messages && messages.Messages && messages.Messages.length > 0) {
        const messagesToProcess = messages.Messages.map(async (msg) => {
          const message = JSON.parse(msg.Body as string)
          Logger.info(`[PollQueueAdapter.execute]: ${message}`)

          try {
            await TriggerUCFactory.execute(message, message)
            await this.deleteMessages.execute({
              queue: params.queue,
              receipt_handle: msg.ReceiptHandle
            })
          } catch (error) {
            Logger.error(
              `[PollQueueAdapter.execute] Error processing message: ${error}`
            )
          }
        })

        await Promise.all(messagesToProcess)
        hasMessages = messages.Messages.length > 0
      } else {
        Logger.info('[PollQueueAdapter.execute] No messages to process.')
        hasMessages = false
      }
    }

    if (Date.now() - startTime >= timeout) {
      Logger.warn('[PollQueueAdapter.execute] Polling timed out.')
      setTimeout(
        () =>
          this.execute({
            queue: Queue.Category.Name
          }),
        0
      )
    }
  }
}
