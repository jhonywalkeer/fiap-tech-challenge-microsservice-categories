import { Repositories } from '@application/repositories/common'
import { CreateRepository } from '@common/types'
import { CategoryEntity } from '@domain/entities'

export interface CreateCategoryRepository
  extends Omit<Repositories<CategoryEntity>, CreateRepository> {}
