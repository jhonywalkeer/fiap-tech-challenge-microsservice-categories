import { ErrorName, Operation, StatusCode } from '@common/enums'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { DeleteCategoryPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { CreatedCategoryMock, InputCategoryParamMock } from '@mocks/categories'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Delete Category Prisma Repository', () => {
  let repository: DeleteCategoryPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new DeleteCategoryPrismaRepository(prisma)
  })

  const pathParameters: Identifier = { id: InputCategoryParamMock }

  it('should create a category successfully', async () => {
    jest.spyOn(prisma.category, 'delete').mockResolvedValue(CreatedCategoryMock)

    const result = await repository.delete(pathParameters)

    expect(result).toBe(undefined)
  })

  it('should throw an HttpException when category deletion fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Delete,
      Field.Category
    )

    jest.spyOn(prisma.category, 'delete').mockRejectedValue(httpException)

    try {
      await repository.delete(pathParameters)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })
})
