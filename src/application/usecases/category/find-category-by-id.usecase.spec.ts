import { FindCategoryByIdRepository } from '@application/repositories/category'
import { FindCategoryByIdUC } from '@application/usecases/category'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindCategoryByIdMock, FindedCategoryByIdMock } from '@mocks/categories'
import { NotFoundStub, NotOccurredStub } from '@stubs/exceptions'

describe('[Use Cases] Find Category By Id Use Case', () => {
  let findCategoryByIdUC: FindCategoryByIdUseCase
  let findCategoryByIdRepository: jest.Mocked<FindCategoryByIdRepository>
  let sendMessageAdapter: jest.Mocked<SendMessageAdapter>
  let sendEvent: SendEventGateway
  let logger: jest.SpyInstance

  const input: Identifier = FindCategoryByIdMock
  const findedCategory: CategoryEntity = FindedCategoryByIdMock

  beforeEach(() => {
    findCategoryByIdRepository = {
      findById: jest.fn()
    } as unknown as jest.Mocked<FindCategoryByIdRepository>
    sendEvent = new SendEventGateway(sendMessageAdapter)
    findCategoryByIdUC = new FindCategoryByIdUC(
      findCategoryByIdRepository,
      sendEvent
    )
    logger = jest.spyOn(Logger, 'info').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should find category by id', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(findedCategory)

    const result: CategoryEntity = await findCategoryByIdUC.execute(input)

    expect(findCategoryByIdUC.execute).toBeInstanceOf(Function)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledTimes(1)
    expect(findCategoryByIdRepository.findById).toHaveBeenCalledWith(input)
    expect(logger).toHaveBeenCalledWith('[FindCategoryByIdUC.execute]')
    expect(result).toBe(findedCategory)
  })

  it('should generate an error if the category is not found', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(null)

    const httpException: HttpException = NotOccurredStub(
      StatusCode.NotFound,
      ErrorName.NotFoundInformation,
      Operation.Find,
      Field.Category
    )

    expect(() => findCategoryByIdUC.execute(input)).rejects.toThrow(
      httpException
    )
    expect(NotFoundStub.statusCode).toBe(StatusCode.NotFound)
    expect(NotFoundStub.name).toBe(ErrorName.NotFoundInformation)
    expect(NotFoundStub.message).toBe(
      NotOccurredError(Operation.Find, Field.Category)
    )
  })

  it('should send an event when the event parameter is true', async () => {
    findCategoryByIdRepository.findById.mockResolvedValue(findedCategory)
    sendEvent.execute = jest.fn()

    const inputWithEvent: Identifier = {
      ...input,
      event: true
    }

    await findCategoryByIdUC.execute(inputWithEvent)

    expect(sendEvent.execute).toHaveBeenCalled()
  })
})
