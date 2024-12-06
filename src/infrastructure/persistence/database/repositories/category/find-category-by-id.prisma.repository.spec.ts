import { ErrorName, Operation, StatusCode } from '@common/enums'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindCategoryByIdMock, FindedCategoryByIdMock } from '@mocks/categories'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find Users By Id Prisma Repository', () => {
  let repository: FindCategoryByIdPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindCategoryByIdPrismaRepository(prisma)
  })

  const pathParameter: Identifier = FindCategoryByIdMock

  it('should return a list of category with the id in path parameter', async () => {
    jest
      .spyOn(prisma.category, 'findUnique')
      .mockResolvedValue(FindedCategoryByIdMock as any)

    const result: CategoryEntity | null =
      await repository.findById(pathParameter)

    expect(result).toEqual(FindedCategoryByIdMock)
  })

  it('should throw an HttpException when list of category with the id fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.Category
    )

    jest.spyOn(prisma.category, 'findUnique').mockRejectedValue(httpException)

    try {
      await repository.findById(pathParameter)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when category is not found', async () => {
    jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(null)

    const result: CategoryEntity | null =
      await repository.findById(pathParameter)

    expect(result).toBeNull()
  })
})
