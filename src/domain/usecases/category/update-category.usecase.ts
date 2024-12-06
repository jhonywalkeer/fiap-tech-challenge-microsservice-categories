import { CategoryEntity } from '@domain/entities'
import { UpdateCategory } from '@domain/interfaces/category'

export interface UpdateCategoryUseCase {
  execute(payload: UpdateCategory): Promise<CategoryEntity>
}
