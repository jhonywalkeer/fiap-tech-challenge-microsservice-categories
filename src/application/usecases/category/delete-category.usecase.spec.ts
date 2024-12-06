import {
  DeleteCategoryRepository,
  FindCategoryByIdRepository
} from '@application/repositories/category'
import { DeleteCategoryUC } from '@application/usecases/category'
import { ErrorName, StatusCode, Operation } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { Field } from '@domain/enums'
import { DeleteCategoryUseCase } from '@domain/usecases/category'
import { DeleteCategoryMock } from '@mocks/categories'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Delete Category Use Case', () => {
  let deleteCategoryUC: DeleteCategoryUseCase
  let findCategoryByIdRepository: jest.Mocked<FindCategoryByIdRepository>
  let deleteCategoryRepository: jest.Mocked<DeleteCategoryRepository>
  let logger: jest.SpyInstance

  const pathParameters: Identifier = DeleteCategoryMock

  beforeEach(() => {
    findCategoryByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindCategoryByIdRepository>
    deleteCategoryRepository = {
      delete: jest.fn()
    } as unknown as jest.Mocked<DeleteCategoryRepository>

    deleteCategoryUC = new DeleteCategoryUC(
      findCategoryByIdRepository,
      deleteCategoryRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should delete a category', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue({} as any)

    await deleteCategoryUC.execute(pathParameters)

    expect(deleteCategoryUC.execute).toBeInstanceOf(Function)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledWith(
      pathParameters
    )
    expect(deleteCategoryRepository.delete).toHaveBeenCalledTimes(1)
    expect(deleteCategoryRepository.delete).toHaveBeenCalledWith(pathParameters)
    expect(logger).toHaveBeenCalledWith('[DeleteCategoryUC.execute]')
  })

  it('should generate an error if the category does not exist', async () => {
    findCategoryByIdRepository.findById = jest.fn().mockResolvedValue(null)
    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Delete,
      Field.Category
    )

    await expect(deleteCategoryUC.execute(pathParameters)).rejects.toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Delete, Field.Category)
    )
  })
})
