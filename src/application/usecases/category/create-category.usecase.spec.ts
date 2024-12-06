import {
  CreateCategoryRepository,
  FindCategoryByConditionRepository
} from '@application/repositories/category'
import { CreateCategoryUC } from '@application/usecases/category'
import { ErrorName, StatusCode } from '@common/enums'
import { ExistsError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { CreateCategory } from '@domain/interfaces/category'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { CreatedCategoryMock, InputCategoryBodyMock } from '@mocks/categories'
import { ExistsResourceStub } from '@stubs/exceptions'

describe('[Use Cases] Create Category Use Case', () => {
  let createCategoryUC: CreateCategoryUseCase
  let findCategoryByConditionRepository: jest.Mocked<FindCategoryByConditionRepository>
  let createCategoryRepository: jest.Mocked<CreateCategoryRepository>
  let logger: jest.SpyInstance

  const input: CreateCategory = InputCategoryBodyMock

  beforeEach(() => {
    findCategoryByConditionRepository = {
      findByCondition: jest.fn()
    } as unknown as jest.Mocked<FindCategoryByConditionRepository>
    createCategoryRepository = {
      create: jest.fn()
    } as unknown as jest.Mocked<CreateCategoryRepository>

    createCategoryUC = new CreateCategoryUC(
      findCategoryByConditionRepository,
      createCategoryRepository
    )

    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a category', async () => {
    findCategoryByConditionRepository.findByCondition.mockResolvedValue(null)
    createCategoryRepository.create.mockResolvedValue(CreatedCategoryMock)

    const result: CategoryEntity = await createCategoryUC.execute(input)

    expect(createCategoryUC.execute).toBeInstanceOf(Function)
    expect(
      findCategoryByConditionRepository.findByCondition
    ).toHaveBeenCalledTimes(1)
    expect(
      findCategoryByConditionRepository.findByCondition
    ).toHaveBeenCalledWith(input)
    expect(createCategoryRepository.create).toHaveBeenCalledTimes(1)
    expect(createCategoryRepository.create).toHaveBeenCalledWith(input)
    expect(logger).toHaveBeenCalledWith('[CreateCategoryUC.execute]')
    expect(result).toEqual(CreatedCategoryMock)
  })

  it('should generate an error if the user already exists when searching by name', async () => {
    findCategoryByConditionRepository.findByCondition.mockResolvedValue([
      CreatedCategoryMock
    ])

    const httpException: HttpException = ExistsResourceStub

    expect(() => createCategoryUC.execute(CreatedCategoryMock)).rejects.toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.Conflict)
    expect(httpException.name).toBe(ErrorName.ResourceAlreadyExists)
    expect(httpException.message).toBe(ExistsError(Field.Category))
  })
})
