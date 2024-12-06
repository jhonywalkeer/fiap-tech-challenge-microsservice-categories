import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { CategoryEntity } from '@domain/entities'

export interface FindAllCategoriesRepository
  extends Omit<
    Repositories<PaginateResponse<CategoryEntity> | null>,
    FindAllRepository
  > {}
