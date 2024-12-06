import { Gateway } from '@application/protocols/http'
import { ReadMessagesConsumer } from '@application/queues/consumers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class ReceiveEventGateway implements Gateway<any> {
  constructor(private readonly readEvent: ReadMessagesConsumer) {}
  async execute(event: QueueParams): Promise<any> {
    Logger.info(`[SendEventGateway.execute]: ${event.queue}`)

    return await this.readEvent.execute(event)
  }
}
