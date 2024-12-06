import { Pagination } from '@common/constants'
import { Ordenation } from '@common/enums/ordenation.enum'
import { Field } from '@domain/enums'
import { IsEnumValidator } from '@presentation/validators'

export class PaginateDTO {
  page: number
  limit: number
  sort?: string
  order?: string

  constructor(
    page: number = Pagination.Default.Page,
    limit: number = Pagination.Default.Limit,
    sort?: string,
    order?: string
  ) {
    this.page = Number(page)
    this.limit = Number(limit)
    this.sort = sort
    this.order = order
      ? IsEnumValidator(order, Ordenation, Field.Order)
      : Ordenation.ASC
  }
}
