import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { CategoryEntity } from '@domain/entities'

export interface FindCategoryByConditionRepository
  extends Omit<
    Repositories<CategoryEntity[] | null>,
    FindByConditionRepository
  > {}
