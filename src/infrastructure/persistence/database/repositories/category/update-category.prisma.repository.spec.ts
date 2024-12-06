import { ErrorName, Operation, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindCategoryByIdPrismaRepository,
  UpdateCategoryPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import {
  InputCategoryBodyMock,
  InputCategoryParamMock,
  UpdateCategoryMock
} from '@mocks/categories'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Delete Category Prisma Repository', () => {
  let findRepository: FindCategoryByIdPrismaRepository
  let repository: UpdateCategoryPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    findRepository = new FindCategoryByIdPrismaRepository(prisma)
    repository = new UpdateCategoryPrismaRepository(prisma, findRepository)
  })

  const body: UpdateCategory = {
    id: InputCategoryParamMock,
    ...InputCategoryBodyMock
  }

  it('should create a category successfully', async () => {
    jest.spyOn(prisma.category, 'update').mockResolvedValue(UpdateCategoryMock)
    jest.spyOn(findRepository, 'findById').mockResolvedValue(UpdateCategoryMock)

    const result = await repository.update(body)

    expect(result).toBe(UpdateCategoryMock)
  })

  it('should throw an HttpException when category update fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Update,
      Field.Category
    )

    jest.spyOn(prisma.category, 'update').mockRejectedValue(httpException)

    try {
      await repository.update(body)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })
})
