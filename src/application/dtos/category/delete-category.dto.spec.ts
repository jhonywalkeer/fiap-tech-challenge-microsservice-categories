import { DeleteCategoryDTO } from '@application/dtos/category'
import { EmptyFiller } from '@common/constants'
import { StatusCode, ErrorName } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { InputCategoryParamMock, DeleteCategoryMock } from '@mocks/categories'
import { InvalidParamStub } from '@stubs/exceptions'

describe(`[DTO's] Delete Category DTO`, () => {
  it('should delete an instance of DeleteCategoryDTO', () => {
    const input = new DeleteCategoryDTO(InputCategoryParamMock)

    expect(input).toBeInstanceOf(DeleteCategoryDTO)
    expect(input).toEqual(DeleteCategoryMock)
  })

  it('should throw an error if id is empty string', () => {
    expect(() => new DeleteCategoryDTO(EmptyFiller)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is null', () => {
    expect(() => new DeleteCategoryDTO(null as any)).toThrow(InvalidParamStub)
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })

  it('should throw an error if id is undefined', () => {
    expect(() => new DeleteCategoryDTO(undefined as any)).toThrow(
      InvalidParamStub
    )
    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
