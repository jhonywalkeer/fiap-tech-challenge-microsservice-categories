import { FindCategoryByIdDTO } from '@application/dtos/category'
import { EmptyFiller } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { InputCategoryParamMock } from '@mocks/categories'
import { FindCategoryByIdMock } from '@mocks/categories'
import { InvalidParamStub } from '@stubs/exceptions'

describe(`[DTO's] Find Category By Id DTO`, () => {
  it('should call with the correct id', () => {
    const input = new FindCategoryByIdDTO(InputCategoryParamMock)

    expect(input).toBeInstanceOf(FindCategoryByIdDTO)
    expect(input).toEqual(FindCategoryByIdMock)
  })

  it('should throw an error if id is empty string provided', () => {
    expect(() => new FindCategoryByIdDTO(EmptyFiller)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null provided', () => {
    expect(() => new FindCategoryByIdDTO(null as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined provided', () => {
    expect(() => new FindCategoryByIdDTO(undefined as any)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
