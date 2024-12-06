import { QueueEvent } from '@common/interfaces'

export interface PaginationAndFilter extends QueueEvent {
  page: number
  limit: number
  sort?: string
  order?: string
}
