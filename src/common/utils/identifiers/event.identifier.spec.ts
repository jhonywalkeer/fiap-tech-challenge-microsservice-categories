import { EventIdentifier } from '@common/utils/identifiers'
import { CategoryEvents } from '@domain/enums'

describe('[Identifier] Event Identifier', () => {
  it('should return the correct event identifier for "find-all-categories"', () => {
    const result = EventIdentifier('find-all-categories')
    expect(result).toBe(CategoryEvents.FindAll)
  })

  it('should return the correct event identifier for "find-category-by-id"', () => {
    const result = EventIdentifier('find-category-by-id')
    expect(result).toBe(CategoryEvents.FindById)
  })

  it('should return CategoryEvents.Unknown for an unknown event', () => {
    const result = EventIdentifier('any_other_event')
    expect(result).toBe(CategoryEvents.Unknown)
  })
})
