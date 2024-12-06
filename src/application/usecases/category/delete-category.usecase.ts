import {
  DeleteCategoryRepository,
  FindCategoryByIdRepository
} from '@application/repositories/category'
import { ErrorName, StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteCategoryUseCase } from '@domain/usecases/category'

export class DeleteCategoryUC implements DeleteCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository
  ) {}
  async execute(pathParameters: Identifier): Promise<void> {
    Logger.info('[DeleteCategoryUC.execute]')

    const findCategory: CategoryEntity | null =
      await this.findCategoryByIdRepository.findById(pathParameters)

    if (findCategory === null) {
      const message: string = NotOccurredError(Operation.Delete, Field.Category)
      Logger.error(
        `[DeleteCategoryUC.execute]: Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    return await this.deleteCategoryRepository.delete(pathParameters)
  }
}
