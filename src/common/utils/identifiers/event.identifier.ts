import { CategoryEvents } from '@domain/enums'

export const EventIdentifier = (event: string): string => {
  const eventMap: { [key: string]: string } = {
    'find-all-categories': CategoryEvents.FindAll,
    'find-category-by-id': CategoryEvents.FindById
  }

  return eventMap[event] || CategoryEvents.Unknown
}
