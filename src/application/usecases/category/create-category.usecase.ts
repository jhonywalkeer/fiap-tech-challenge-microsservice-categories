import {
  CreateCategoryRepository,
  FindCategoryByConditionRepository
} from '@application/repositories/category'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { CreateCategoryUseCase } from '@domain/usecases/category'

export class CreateCategoryUC implements CreateCategoryUseCase {
  constructor(
    private readonly findCategoryByConditionRepository: FindCategoryByConditionRepository,
    private readonly createCategoryRepository: CreateCategoryRepository
  ) {}
  async execute(payload: CreateCategory): Promise<CategoryEntity> {
    Logger.info('[CreateCategoryUC.execute]')

    const findCategory =
      await this.findCategoryByConditionRepository.findByCondition(payload)

    if (findCategory) {
      const message: string = ExistsError(Field.Category)
      Logger.error(
        `[CreateCategoryUC.execute]: Status Code ${StatusCode.Conflict} | ${message}`
      )
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        message
      )
    }

    return await this.createCategoryRepository.create(payload)
  }
}
