import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteCategoryRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
