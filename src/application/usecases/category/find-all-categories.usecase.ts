import { FindAllCategoriesRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'

export class FindAllCategoriesUC implements FindAllCategoriesUseCase {
  constructor(
    private readonly findAllCategoriesRepository: FindAllCategoriesRepository
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<CategoryEntity>> {
    Logger.info('[FindAllCategoriesUC.execute]')

    const findCategories: PaginateResponse<CategoryEntity> | null =
      await this.findAllCategoriesRepository.findAll(queryParameters)

    if (!findCategories) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[FindAllCategoriesUC.execute]: Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    return findCategories
  }
}
