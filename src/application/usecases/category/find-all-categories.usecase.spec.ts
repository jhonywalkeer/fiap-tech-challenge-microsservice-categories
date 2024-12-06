import { FindAllCategoriesRepository } from '@application/repositories/category'
import { FindAllCategoriesUC } from '@application/usecases/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'
import { FindAllPaginetedCategoriesMock } from '@mocks/categories'
import { PaginationInputMock } from '@mocks/pagination'
import { NotFoundStub, NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Find All Categories Use Case', () => {
  let findAllCategoriesUC: FindAllCategoriesUseCase
  let findAllCategoriesRepository: jest.Mocked<FindAllCategoriesRepository>

  const input: PaginationAndFilter = PaginationInputMock
  const fidedAllCategories: PaginateResponse<CategoryEntity> =
    FindAllPaginetedCategoriesMock

  beforeEach(() => {
    findAllCategoriesRepository = {
      findAll: jest.fn()
    } as unknown as jest.Mocked<FindAllCategoriesRepository>
    findAllCategoriesUC = new FindAllCategoriesUC(findAllCategoriesRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should find all categories', async () => {
    jest
      .spyOn(findAllCategoriesRepository, 'findAll')
      .mockResolvedValue(fidedAllCategories)

    const result: PaginateResponse<CategoryEntity> =
      await findAllCategoriesUC.execute(input)

    expect(findAllCategoriesUC.execute).toBeInstanceOf(Function)
    expect(findAllCategoriesRepository.findAll).toHaveBeenCalledTimes(1)
    expect(findAllCategoriesRepository.findAll).toHaveBeenCalledWith(input)
    expect(result).toStrictEqual(FindAllPaginetedCategoriesMock)
  })

  it('should generate an error if there are no categories', async () => {
    jest.spyOn(findAllCategoriesRepository, 'findAll').mockResolvedValue(null)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.Category
    )

    expect(() => findAllCategoriesUC.execute(input)).rejects.toThrow(
      httpException
    )

    expect(NotFoundStub.statusCode).toBe(StatusCode.NotFound)
    expect(NotFoundStub.name).toBe(ErrorName.NotFoundInformation)
    expect(NotFoundStub.message).toBe(
      NotOccurredError(Operation.Find, Field.Category)
    )
  })
})
