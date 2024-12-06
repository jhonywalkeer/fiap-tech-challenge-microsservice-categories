import { Gateway } from '@application/protocols/http'
import { QueuePoll } from '@application/queues/pollers'
import { QueueParams } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'

export class PollEventGateway implements Gateway<any> {
  constructor(private readonly readEvent: QueuePoll) {}
  async execute(event: QueueParams): Promise<any> {
    Logger.info(`[PollEventGateway.execute]: ${event.queue}`)

    return await this.readEvent.execute(event)
  }
}
