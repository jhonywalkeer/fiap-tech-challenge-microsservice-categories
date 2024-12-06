import { FindAllCategoriesRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllCategoriesPrismaRepository
  implements FindAllCategoriesRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<CategoryEntity> | null> {
    try {
      const sortingField: string = queryParameters.sort || 'created_at'
      const findCategories = await this.prisma.category.findMany({
        ...PaginationFilter(queryParameters.page, queryParameters.limit),
        orderBy: {
          [sortingField]: queryParameters.order
        }
      })
      const countCategories = await this.prisma.category.count()
      return !findCategories || findCategories.length === 0
        ? null
        : {
            total: countCategories,
            page: queryParameters.page,
            total_pages: Math.ceil(countCategories / queryParameters.limit),
            limit: queryParameters.limit,
            data: findCategories
          }
    } catch (error) {
      Logger.error(
        `[FindAllCategoriesPrismaRepository.findAll]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Category)
      )
    }
  }
}
