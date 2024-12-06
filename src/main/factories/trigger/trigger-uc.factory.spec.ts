import {
  FindAllCategoriesUC,
  FindCategoryByIdUC
} from '@application/usecases/category'
import { CategoryEvents } from '@domain/enums'
import { TriggerUCFactory } from '@main/factories/trigger'

jest.mock('@application/usecases/category')
jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/category')
jest.mock('@infrastructure/gateways/queues')
jest.mock('@main/adapters/queues/producers')

describe('[Factories] TriggerUC Factory', () => {
  const mockMessage = { id: 1, name: 'Test User' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should execute FindCategoryByIdUC when usecase is FindById', async () => {
    const executeMock = jest.fn().mockResolvedValue('findByIdResult')
    FindCategoryByIdUC.prototype.execute = executeMock

    const result = await TriggerUCFactory.execute(
      CategoryEvents.FindById,
      mockMessage
    )

    expect(executeMock).toHaveBeenCalledWith({ ...mockMessage, event: true })
    expect(result).toBe('findByIdResult')
  })

  it('should execute FindAllCategoriesUC when usecase is FindAll', async () => {
    const executeMock = jest.fn().mockResolvedValue('findAllResult')
    FindAllCategoriesUC.prototype.execute = executeMock

    const result = await TriggerUCFactory.execute(
      CategoryEvents.FindAll,
      mockMessage
    )

    expect(executeMock).toHaveBeenCalledWith({ ...mockMessage, event: true })
    expect(result).toBe('findAllResult')
  })

  it('should return null when usecase is not recognized', async () => {
    const result = await TriggerUCFactory.execute('UnknownUsecase', mockMessage)

    expect(result).toBeNull()
  })
})
