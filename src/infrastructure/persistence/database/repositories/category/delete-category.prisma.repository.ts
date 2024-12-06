import { DeleteCategoryRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class DeleteCategoryPrismaRepository
  implements DeleteCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: Identifier): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      Logger.error(
        `[DeleteCategoryPrismaRepository.delete]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Delete, Field.Category)
      )
    }
  }
}
