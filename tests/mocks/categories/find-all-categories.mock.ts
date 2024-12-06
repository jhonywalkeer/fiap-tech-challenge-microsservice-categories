import { CategoryEntity } from '@domain/entities'
import {
  FindedCategoryByIdMock,
  InputCategoryParamMock
} from '@mocks/categories'
import { PaginationInputMock } from '@mocks/pagination'

export const findAllCategoryMock = [
  FindedCategoryByIdMock,
  {
    id: InputCategoryParamMock,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'Categoria B',
    description: 'Descrição da categoria nomeada como B'
  }
]

export const FindAllPaginetedCategoriesMock = {
  data: findAllCategoryMock as CategoryEntity[],
  total: findAllCategoryMock.length,
  page: PaginationInputMock.page,
  total_pages: Math.ceil(
    findAllCategoryMock.length / PaginationInputMock.limit
  ),
  limit: PaginationInputMock.limit
}
