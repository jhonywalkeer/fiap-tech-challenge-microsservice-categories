import { CategoryEntity } from '@domain/entities'
import { CreateCategory } from '@domain/interfaces/category'

export interface CreateCategoryUseCase {
  execute(payload: CreateCategory): Promise<CategoryEntity>
}
