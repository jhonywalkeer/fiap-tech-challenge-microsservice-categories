import { CreateCategoryDTO } from '@application/dtos/category'
import { EmptyFiller } from '@common/constants'
import { ErrorName, StatusCode, Type } from '@common/enums'
import { InvalidBodyError } from '@common/errors'
import { Field } from '@domain/enums'
import { InputCategoryBodyMock, CreateCategoryMock } from '@mocks/categories'
import { InvalidBodyStub, InvalidFieldTypeStub } from '@stubs/exceptions'

describe(`[DTO's] Create Category DTO`, () => {
  it('should create an instance of CreateCategoryDTO', () => {
    const body = new CreateCategoryDTO(
      InputCategoryBodyMock.name,
      InputCategoryBodyMock.description
    )

    expect(body).toBeInstanceOf(CreateCategoryDTO)
    expect(body.name).toBe(CreateCategoryMock.name)
    expect(body.description).toBe(CreateCategoryMock.description)
  })

  it('should throw if name is not provided', () => {
    expect(
      () =>
        new CreateCategoryDTO(EmptyFiller, InputCategoryBodyMock.description)
    ).toThrow(InvalidBodyStub)
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })

  it('should throw if description is not provided', () => {
    expect(
      () => new CreateCategoryDTO(InputCategoryBodyMock.name, EmptyFiller)
    ).toThrow(InvalidBodyStub)
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })

  it('should throw if name and description is not provided', () => {
    expect(() => new CreateCategoryDTO(EmptyFiller, EmptyFiller)).toThrow(
      InvalidBodyStub
    )
    expect(InvalidBodyStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidBodyStub.name).toBe(ErrorName.InvalidBody)
    expect(InvalidBodyStub.message).toBe(InvalidBodyError())
  })

  it('should throw if name is not a string', () => {
    expect(
      () => new CreateCategoryDTO(1 as any, InputCategoryBodyMock.description)
    ).toThrow(InvalidFieldTypeStub(Field.Name, Type.string))
  })

  it('should throw if description is not a string', () => {
    expect(
      () => new CreateCategoryDTO(InputCategoryBodyMock.name, 1 as any)
    ).toThrow(InvalidFieldTypeStub(Field.Description, Type.string))
  })
})
