import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { CategoryEntity } from '@domain/entities'

export interface FindCategoryByIdRepository
  extends Omit<Repositories<CategoryEntity | null>, FindByIdRepository> {}
