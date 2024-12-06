import { UpdateCategoryRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'

export class UpdateCategoryPrismaRepository
  implements UpdateCategoryRepository
{
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly categoryRepository: FindCategoryByIdPrismaRepository
  ) {}

  async update(payload: UpdateCategory): Promise<CategoryEntity | null> {
    try {
      const update = await this.prisma.category.update({
        where: {
          id: payload.id
        },
        data: {
          name: payload.name,
          description: payload.description
        }
      })

      return await this.categoryRepository.findById({ id: update.id })
    } catch (error) {
      Logger.error(
        `[UpdateCategoryPrismaRepository.update]: Status Code ${StatusCode.InternalServerError} | ${error}`
      )
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Update, Field.Category)
      )
    }
  }
}
