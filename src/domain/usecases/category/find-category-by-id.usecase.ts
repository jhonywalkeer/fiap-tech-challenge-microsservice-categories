import { Identifier } from '@common/interfaces'
import { CategoryEntity } from '@domain/entities'

export interface FindCategoryByIdUseCase {
  execute(pathParameters: Identifier): Promise<CategoryEntity>
}
