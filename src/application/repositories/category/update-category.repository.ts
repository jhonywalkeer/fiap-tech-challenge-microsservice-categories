import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'
import { CategoryEntity } from '@domain/entities'

export interface UpdateCategoryRepository
  extends Omit<Repositories<CategoryEntity | null>, UpdateRepository> {}
