import { Pagination } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllCategoriesPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindAllPaginetedCategoriesMock } from '@mocks/categories'
import { RepositoryMock } from '@mocks/repository.mock'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Repositories] Find All Category Prisma Repository', () => {
  let repository: FindAllCategoriesPrismaRepository
  let prisma: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    prisma = {
      category: RepositoryMock
    } as unknown as jest.Mocked<DatabaseConnection>
    repository = new FindAllCategoriesPrismaRepository(prisma)
  })

  const queryParameters: PaginationAndFilter = {
    page: Pagination.Default.Page,
    limit: Pagination.Default.Limit
  }

  it('should return a list of categories with the pagination and filter', async () => {
    jest
      .spyOn(prisma.category, 'findMany')
      .mockResolvedValue(FindAllPaginetedCategoriesMock.data as any)
    jest
      .spyOn(prisma.category, 'count')
      .mockResolvedValue(FindAllPaginetedCategoriesMock.total)

    const result: PaginateResponse<CategoryEntity> | null =
      await repository.findAll(queryParameters)

    expect(result).toEqual(FindAllPaginetedCategoriesMock)
  })

  it('should throw an HttpException when list of categories fails', async () => {
    const httpException: HttpException = NotOccurredStub(
      StatusCode.InternalServerError,
      ErrorName.InternalError,
      Operation.Find,
      Field.Category
    )

    jest.spyOn(prisma.category, 'findMany').mockRejectedValue(httpException)

    try {
      await repository.findAll(queryParameters)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error).toEqual(httpException)
    }
  })

  it('should return null when list of category is not found', async () => {
    jest.spyOn(prisma.category, 'findMany').mockResolvedValue([])

    const result = await repository.findAll(queryParameters)

    expect(result).toBeNull()
  })
})
