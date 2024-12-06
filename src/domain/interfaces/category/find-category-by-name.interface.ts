import { CreateCategory } from '@domain/interfaces/category'

export interface FindCategoryByName {
  name: CreateCategory['name']
  description?: CreateCategory['description']
}
