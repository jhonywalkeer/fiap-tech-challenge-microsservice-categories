import { CategoryEventMap } from '@application/mappers'
import { InputCategoryParamMock } from '@mocks/categories'

describe('[Mappers] Category Event Map', () => {
  it('should generate correct QueueParams', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'find-all-categories'
    const data = { categoryId: InputCategoryParamMock }

    const result = CategoryEventMap.execute(queue, eventIdentifier, data)

    expect(result.queue).toBe(queue)
    expect(result.message).toContain('"type":"find-all-categories"')
    expect(result.message).toContain(
      '"data":{"categoryId":"25097f13-505f-4236-9901-f9998add2b31"}'
    )
    expect(result.message_group_id).toBe('find-all-categories')
    expect(result.message_deduplication_id).toBeDefined()
    expect(result.message_id).toBe('find-all-categories')
  })

  it('should handle undefined data', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'find-category-by-id'

    const result = CategoryEventMap.execute(queue, eventIdentifier, undefined)

    expect(result.message).toContain('"data":{}')
  })

  it('should return unknown event for invalid event identifier', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'invalid-event'
    const data = { userId: 1 }

    const result = CategoryEventMap.execute(queue, eventIdentifier, data)

    expect(result.message).toContain('"type":"unknown-event"')
    expect(result.message_group_id).toBe('unknown-event')
    expect(result.message_id).toBe('unknown-event')
  })
})
