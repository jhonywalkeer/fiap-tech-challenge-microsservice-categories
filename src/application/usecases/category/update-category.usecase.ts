import {
  FindCategoryByIdRepository,
  UpdateCategoryRepository
} from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { UpdateCategoryUseCase } from '@domain/usecases/category'

export class UpdateCategoryUC implements UpdateCategoryUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly updateCategoryRepository: UpdateCategoryRepository
  ) {}
  async execute(payload: UpdateCategory): Promise<CategoryEntity> {
    Logger.info(`[UpdateCategoryUC.execute]`)

    const findCategory: CategoryEntity | null =
      await this.findCategoryByIdRepository.findById(payload)

    if (!findCategory) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[UpdateCategoryUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    const updateCategory: CategoryEntity | null =
      await this.updateCategoryRepository.update({
        id: payload.id,
        name: payload.name ? payload.name : findCategory.name,
        description: payload.description
          ? payload.description
          : findCategory.description
      })

    if (!updateCategory) {
      const message: string = NotOccurredError(Operation.Update, Field.Category)
      Logger.error(
        `[UpdateCategoryUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.BadRequest,
        NotOccurredError(Operation.Update, Field.Category)
      )
    }

    return updateCategory
  }
}
