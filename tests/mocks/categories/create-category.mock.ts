import { InputCategoryParamMock } from './delete-category.mock'

export const InputCategoryBodyMock = {
  name: 'Categoria A',
  description: 'Descrição da categoria nomeada como A'
}

export const CreateCategoryMock = InputCategoryBodyMock

export const CreatedCategoryMock = {
  id: InputCategoryParamMock,
  created_at: new Date(),
  updated_at: new Date(),
  ...CreateCategoryMock
}
