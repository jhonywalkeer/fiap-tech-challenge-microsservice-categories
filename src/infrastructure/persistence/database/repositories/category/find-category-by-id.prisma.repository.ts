import { FindCategoryByIdRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByIdPrismaRepository
  implements FindCategoryByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: Identifier): Promise<CategoryEntity | null> {
    try {
      const findCategory = await this.prisma.category.findUnique({
        where: {
          id: pathParameters.id
        }
      })
      return !findCategory ? null : findCategory
    } catch (error) {
      Logger.error(
        `[FindCategoryByIdPrismaRepository.findById]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Category)
      )
    }
  }
}
