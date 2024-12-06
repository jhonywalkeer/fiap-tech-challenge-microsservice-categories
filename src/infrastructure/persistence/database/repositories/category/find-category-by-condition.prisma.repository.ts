import { FindCategoryByConditionRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindCategoryByName } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindCategoryByConditionPrismaRepository
  implements FindCategoryByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}
  async findByCondition(
    condition: FindCategoryByName
  ): Promise<CategoryEntity[] | null> {
    try {
      const findCategory = await this.prisma.category.findMany({
        where: {
          name: condition.name
        }
      })
      return !findCategory || findCategory.length === 0 ? null : findCategory
    } catch (error) {
      Logger.error(
        `[FindCategoryByConditionPrismaRepository.findByCondition]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Category)
      )
    }
  }
}
