import { CreateCategoryRepository } from '@application/repositories/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { CreateCategoryPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { CreatedCategoryMock, InputCategoryBodyMock } from '@mocks/categories'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Create Category Prisma Repository', () => {
  let repository: CreateCategoryRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new CreateCategoryPrismaRepository(prisma)
  })

  const payload: CreateCategory = InputCategoryBodyMock

  it('should create a category successfully', async () => {
    jest.spyOn(prisma.category, 'create').mockResolvedValue(CreatedCategoryMock)

    const userEntity: CategoryEntity = CreatedCategoryMock
    const result = await repository.create(payload)

    expect(result).toEqual(userEntity)
  })

  it('should throw an HttpException when category creation fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Create,
      Field.Category
    )

    jest.spyOn(prisma.category, 'create').mockRejectedValue(httpException)

    try {
      await repository.create(payload)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })
})
