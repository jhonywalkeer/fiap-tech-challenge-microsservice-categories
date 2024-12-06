import { ErrorName, Operation, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindCategoryByName } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByConditionPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import {
  FindCategoryByConditionMock,
  FindedCategoryByConditionMock
} from '@mocks/categories/find-by-condition.mock'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find Category by Codition Prisma Repository', () => {
  let repository: FindCategoryByConditionPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindCategoryByConditionPrismaRepository(prisma)
  })

  const condition: FindCategoryByName = FindCategoryByConditionMock

  it('should return a list of categories with the condition', async () => {
    jest
      .spyOn(prisma.category, 'findMany')
      .mockResolvedValue(FindedCategoryByConditionMock as any)

    const result: CategoryEntity[] | null =
      await repository.findByCondition(condition)

    expect(result).toEqual(FindedCategoryByConditionMock)
  })

  it('should throw an HttpException when list of categories with condition fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.Category
    )

    jest.spyOn(prisma.category, 'findMany').mockRejectedValue(httpException)

    try {
      await repository.findByCondition(condition)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when list of category with condition is not found', async () => {
    jest.spyOn(prisma.category, 'findMany').mockResolvedValue([])

    const result = await repository.findByCondition(condition)

    expect(result).toBeNull()
  })
})
