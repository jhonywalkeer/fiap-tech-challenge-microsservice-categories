import { UpdateCategoryDTO } from '@application/dtos/category'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode, Type } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import {
  InputCategoryParamMock,
  InputCategoryBodyMock
} from '@mocks/categories'
import { InvalidFieldTypeStub, InvalidParamStub } from '@stubs/exceptions'

describe(`[DTO's] Update Category DTO`, () => {
  it('should update an instance with param and all properties body', () => {
    const body: CreateCategory = InputCategoryBodyMock
    const input = new UpdateCategoryDTO(InputCategoryParamMock, body)

    expect(input).toBeInstanceOf(UpdateCategoryDTO)
    expect(input.id).toBe(InputCategoryParamMock)
    expect(input.name).toBe(InputCategoryBodyMock.name)
    expect(input.description).toBe(InputCategoryBodyMock.description)
  })

  it('should update an instance with id only', () => {
    const input = new UpdateCategoryDTO(InputCategoryParamMock, {})

    expect(input.id).toBe(InputCategoryParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBeUndefined()
  })

  it('should update an instance with name only', () => {
    const body: Partial<CreateCategory> = { name: InputCategoryBodyMock.name }
    const input = new UpdateCategoryDTO(InputCategoryParamMock, body)

    expect(input.id).toBe(InputCategoryParamMock)
    expect(input.name).toBe(InputCategoryBodyMock.name)
    expect(input.description).toBeUndefined()
  })

  it('should update an instance with description only', () => {
    const body: Partial<CreateCategory> = {
      description: InputCategoryBodyMock.description
    }
    const input = new UpdateCategoryDTO(InputCategoryParamMock, body)

    expect(input.id).toBe(InputCategoryParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBe(InputCategoryBodyMock.description)
  })

  it('should throw an error if id is empty string', () => {
    const body: Partial<CreateCategory> = {
      description: InputCategoryBodyMock.description
    }
    expect(() => new UpdateCategoryDTO(EmptyFiller, body)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null', () => {
    const body: Partial<CreateCategory> = {
      description: InputCategoryBodyMock.description
    }

    expect(() => new UpdateCategoryDTO(null as any, body)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined', () => {
    const body: Partial<CreateCategory> = {
      description: InputCategoryBodyMock.description
    }

    expect(() => new UpdateCategoryDTO(undefined as any, body)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw if name is not a string', () => {
    const body: Partial<CreateCategory> = {
      name: 1 as any,
      description: InputCategoryBodyMock.description
    }

    expect(() => new UpdateCategoryDTO(InputCategoryParamMock, body)).toThrow(
      InvalidFieldTypeStub(Field.Name, Type.string)
    )
  })

  it('should throw if description is not a string', () => {
    const body: Partial<CreateCategory> = {
      name: InputCategoryBodyMock.name,
      description: 1 as any
    }
    expect(() => new UpdateCategoryDTO(InputCategoryParamMock, body)).toThrow(
      InvalidFieldTypeStub(Field.Description, Type.string)
    )
  })
})
