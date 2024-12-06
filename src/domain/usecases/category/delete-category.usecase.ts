import { Identifier } from '@common/interfaces'

export interface DeleteCategoryUseCase {
  execute(pathParameters: Identifier): Promise<void>
}
