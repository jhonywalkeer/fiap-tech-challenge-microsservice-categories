import { Identifier } from '@common/interfaces'

export interface UpdateCategory extends Identifier {
  name?: string
  description?: string
}
