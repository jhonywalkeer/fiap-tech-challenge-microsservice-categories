import { Gateway } from '@application/protocols/http'
import { SendMessagesProducer } from '@application/queues/producers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class SendEventGateway implements Gateway<any> {
  constructor(private readonly sendEvent: SendMessagesProducer) {}
  async execute(event: QueueParams): Promise<any> {
    Logger.info(`[SendEventGateway.execute]: ${event.queue}`)

    return await this.sendEvent.execute(event)
  }
}
