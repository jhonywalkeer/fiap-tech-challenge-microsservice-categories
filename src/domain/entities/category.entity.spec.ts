import { CategoryEntity } from '@domain/entities'
import {
  InputCategoryBodyMock,
  InputCategoryParamMock,
  UpdateOtherCategoryBodyMock
} from '@mocks/categories'

describe('[Entities] Category Entity', () => {
  it('should create a category entity', () => {
    const category = new CategoryEntity(
      InputCategoryParamMock,
      InputCategoryBodyMock.name,
      InputCategoryBodyMock.description
    )
    expect(category.id).toBe(InputCategoryParamMock)
    expect(category.name).toBe(InputCategoryBodyMock.name)
    expect(category.description).toBe(InputCategoryBodyMock.description)
    expect(category.create_at).toBeUndefined()
    expect(category.update_at).toBeUndefined()
  })

  it('should create a category entity with dates', () => {
    const now = new Date()
    const category = new CategoryEntity(
      InputCategoryParamMock,
      InputCategoryBodyMock.name,
      InputCategoryBodyMock.description,
      now,
      now
    )
    expect(category.id).toBe(InputCategoryParamMock)
    expect(category.name).toBe(InputCategoryBodyMock.name)
    expect(category.description).toBe(InputCategoryBodyMock.description)
    expect(category.create_at).toBe(now)
    expect(category.update_at).toBe(now)
  })

  it('should update category name and description', () => {
    const category = new CategoryEntity(
      InputCategoryParamMock,
      InputCategoryBodyMock.name,
      InputCategoryBodyMock.description
    )
    category.name = UpdateOtherCategoryBodyMock.name
    category.description = UpdateOtherCategoryBodyMock.description

    expect(category.name).toBe(UpdateOtherCategoryBodyMock.name)
    expect(category.description).toBe(UpdateOtherCategoryBodyMock.description)
  })

  it('should set update_at date when updating category', () => {
    const category = new CategoryEntity(
      InputCategoryParamMock,
      InputCategoryBodyMock.name,
      InputCategoryBodyMock.description
    )
    const now = new Date()
    category.update_at = now
    expect(category.update_at).toBe(now)
  })
})
