import { QueueEvent } from '@common/interfaces'

export interface Identifier extends QueueEvent {
  id?: string
  ids?: string[]
}
