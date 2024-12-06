import { FindCategoryByIdUC } from '@application/usecases/category'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindCategoryByIdControllerFactory } from '@main/factories/category'
import { FindCategoryByIdController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/category')
jest.mock('@application/usecases/category')
jest.mock('@presentation/controllers/category')
jest.mock('@presentation/helpers')

describe('[Factories] Find Category By Id Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      categoryRepository: FindCategoryByIdPrismaRepository
      findCategoryByIdUseCase: FindCategoryByIdUC
      findCategoryByIdController: FindCategoryByIdController
    } = FindCategoryByIdControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.categoryRepository).toBeInstanceOf(
      FindCategoryByIdPrismaRepository
    )
    expect(factoryResult.findCategoryByIdUseCase).toBeInstanceOf(
      FindCategoryByIdUC
    )
    expect(factoryResult.findCategoryByIdController).toBeInstanceOf(
      FindCategoryByIdController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    FindCategoryByIdControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(FindCategoryByIdPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(FindCategoryByIdUC).toHaveBeenCalledWith(
      expect.any(FindCategoryByIdPrismaRepository),
      expect.any(SendEventGateway)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(FindCategoryByIdController).toHaveBeenCalledWith(
      expect.any(FindCategoryByIdUC),
      expect.any(HttpGenericResponse)
    )
  })
})
