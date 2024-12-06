import {
  FindCategoryByIdRepository,
  UpdateCategoryRepository
} from '@application/repositories/category'
import { UpdateCategoryUC } from '@application/usecases/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateCategory } from '@domain/interfaces/category'
import { UpdateCategoryUseCase } from '@domain/usecases/category'
import {
  FindedCategoryByIdMock,
  InputCategoryBodyMock,
  InputCategoryParamMock,
  UpdateCategoryMock
} from '@mocks/categories'
import { NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Delete Category Use Case', () => {
  let updateCategoryUC: UpdateCategoryUseCase
  let findCategoryByIdRepository: jest.Mocked<FindCategoryByIdRepository>
  let updateCategoryRepository: jest.Mocked<UpdateCategoryRepository>
  let logger: jest.SpyInstance

  const body: UpdateCategory = {
    id: InputCategoryParamMock,
    ...InputCategoryBodyMock
  }

  beforeEach(() => {
    findCategoryByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindCategoryByIdRepository>
    updateCategoryRepository = {
      update: jest.fn()
    } as unknown as jest.Mocked<UpdateCategoryRepository>

    updateCategoryUC = new UpdateCategoryUC(
      findCategoryByIdRepository,
      updateCategoryRepository
    )
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update a category', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(
      FindedCategoryByIdMock
    )
    updateCategoryRepository.update.mockResolvedValue(UpdateCategoryMock)

    const result: CategoryEntity = await updateCategoryUC.execute(body)

    expect(updateCategoryUC.execute).toBeInstanceOf(Function)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledWith(body)
    expect(updateCategoryRepository.update).toHaveBeenCalledTimes(1)
    expect(updateCategoryRepository.update).toHaveBeenCalledWith(body)
    expect(logger).toHaveBeenCalledWith('[UpdateCategoryUC.execute]')
    expect(result).toEqual(UpdateCategoryMock)
  })

  it('should update the category informing only the name ', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(
      FindedCategoryByIdMock
    )
    updateCategoryRepository.update.mockResolvedValue(UpdateCategoryMock)

    const inputOnlyName: UpdateCategory = {
      id: InputCategoryParamMock,
      name: InputCategoryBodyMock.name,
      description: null as any
    }

    const result: CategoryEntity = await updateCategoryUC.execute(inputOnlyName)

    expect(updateCategoryUC.execute).toBeInstanceOf(Function)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(updateCategoryRepository.update).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith('[UpdateCategoryUC.execute]')
    expect(result).toEqual(UpdateCategoryMock)
  })

  it('should update the category informing only the description ', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(
      FindedCategoryByIdMock
    )
    updateCategoryRepository.update.mockResolvedValue(UpdateCategoryMock)

    const inputOnlyDescription: UpdateCategory = {
      id: InputCategoryParamMock,
      name: null as any,
      description: InputCategoryBodyMock.description
    }

    const result: CategoryEntity =
      await updateCategoryUC.execute(inputOnlyDescription)

    expect(updateCategoryUC.execute).toBeInstanceOf(Function)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(updateCategoryRepository.update).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith('[UpdateCategoryUC.execute]')
    expect(result).toEqual(UpdateCategoryMock)
  })

  it('should generate an error if the category does not exist', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(null)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.Category
    )

    expect(() => updateCategoryUC.execute(body)).rejects.toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.NotFound)
    expect(httpException.name).toBe(ErrorName.NotFoundInformation)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Find, Field.Category)
    )
  })

  it('should generate an error if the category is not updated', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(
      FindedCategoryByIdMock
    )
    updateCategoryRepository.update.mockResolvedValue(null)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.BadRequest,
      ErrorName.BadRequest,
      Operation.Update,
      Field.Category
    )

    expect(() => updateCategoryUC.execute(body)).rejects.toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      NotOccurredError(Operation.Update, Field.Category)
    )
  })
})
