import { CreateCategoryRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class CreateCategoryPrismaRepository
  implements CreateCategoryRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async create(payload: CreateCategory): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.create({
        data: {
          name: payload.name,
          description: payload.description
        }
      })
    } catch (error) {
      Logger.error(
        `[CreateCategoryPrismaRepository.create]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Create, Field.Category)
      )
    }
  }
}
