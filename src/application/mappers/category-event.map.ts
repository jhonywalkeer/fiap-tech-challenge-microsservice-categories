import { QueueParams } from '@common/interfaces'
import { GenerateUUID } from '@common/utils/generators'
import { EventIdentifier } from '@common/utils/identifiers'

export class CategoryEventMap {
  static execute(
    queue: string,
    eventIdentifier: string,
    data: any
  ): QueueParams {
    const uniqueId = GenerateUUID()
    const eventId = EventIdentifier(eventIdentifier)

    return {
      queue,
      message: JSON.stringify({
        requestId: uniqueId,
        type: eventId,
        data: data ?? {}
      }),
      message_group_id: eventId,
      message_deduplication_id: uniqueId,
      message_id: eventId
    }
  }
}
