import { BaseEntity } from '@domain/entities'
import { InputCategoryParamMock } from '@mocks/categories'

describe('[Entities] Base Entity', () => {
  it('should create an instance with required properties', () => {
    const id = InputCategoryParamMock
    const entity = new BaseEntity(id)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBeUndefined()
    expect(entity.update_at).toBeUndefined()
  })

  it('should create an instance with all properties', () => {
    const id = InputCategoryParamMock
    const createAt = new Date()
    const updateAt = new Date()
    const entity = new BaseEntity(id, createAt, updateAt)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBe(createAt)
    expect(entity.update_at).toBe(updateAt)
  })
})
