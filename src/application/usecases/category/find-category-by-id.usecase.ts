import { CategoryEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import { FindCategoryByIdRepository } from '@application/repositories/category'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { CategoryEvents, Field } from '@domain/enums'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'

export class FindCategoryByIdUC implements FindCategoryByIdUseCase {
  constructor(
    private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
    private readonly sendEvent: Gateway<CategoryEntity>
  ) {}
  async execute(pathParameters: Identifier): Promise<CategoryEntity> {
    Logger.info(`[FindCategoryByIdUC.execute]`)

    const findCategory: CategoryEntity | null =
      await this.findCategoryByIdRepository.findById(pathParameters)

    if (!findCategory) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[FindAllUsersUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    pathParameters.event
      ? this.sendEvent.execute(
          CategoryEventMap.execute(
            Queue.Product.Name,
            CategoryEvents.FindById,
            findCategory
          )
        )
      : false

    return findCategory
  }
}
