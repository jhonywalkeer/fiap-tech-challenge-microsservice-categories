import { FindAllCategoriesDTO } from '@application/dtos/category'
import { Pagination } from '@common/constants'
import { ErrorName, Ordenation, StatusCode } from '@common/enums'
import { ValueIncorrectError } from '@common/errors'
import { Field } from '@domain/enums'
import {
  PageMock,
  LimitMock,
  SortMock,
  OrderMock,
  InvalidOrderMock
} from '@mocks/pagination'
import { InvalidValueStub } from '@stubs/exceptions'

describe(`[DTO's] Find All Areas DTO`, () => {
  it('should return the values ​​with all parameters informed', () => {
    const input: FindAllCategoriesDTO = new FindAllCategoriesDTO(
      PageMock,
      LimitMock,
      SortMock,
      OrderMock
    )

    expect(input).toBeInstanceOf(FindAllCategoriesDTO)
    expect(input.page).toBe(PageMock)
    expect(input.limit).toBe(LimitMock)
    expect(input.sort).toBe(SortMock)
    expect(input.order).toBe(OrderMock)
  })

  it('should return the default values if no value is provided', () => {
    const input: FindAllCategoriesDTO = new FindAllCategoriesDTO()

    expect(input.page).toBe(Pagination.Default.Page)
    expect(input.limit).toBe(Pagination.Default.Limit)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should return the default values if no page informed', () => {
    const input: FindAllCategoriesDTO = new FindAllCategoriesDTO(
      undefined,
      LimitMock,
      undefined,
      OrderMock
    )

    expect(input.page).toBe(Pagination.Default.Page)
    expect(input.limit).toBe(Pagination.Default.Limit)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should return the default values if no limit informed', () => {
    const input: FindAllCategoriesDTO = new FindAllCategoriesDTO(
      PageMock,
      undefined,
      undefined,
      OrderMock
    )

    expect(input.page).toBe(Pagination.Default.Page)
    expect(input.limit).toBe(Pagination.Default.Limit)
    expect(input.sort).toBeUndefined()
    expect(input.order).toBe(Ordenation.ASC)
  })

  it('should throw an exception if the order parameter is invalid', () => {
    expect(() => {
      new FindAllCategoriesDTO(PageMock, LimitMock, SortMock, InvalidOrderMock)
    }).toThrow(InvalidValueStub)
    expect(InvalidValueStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidValueStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidValueStub.message).toBe(ValueIncorrectError(Field.Order))
  })
})
