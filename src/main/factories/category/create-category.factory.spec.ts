import { CreateCategoryUC } from '@application/usecases/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateCategoryPrismaRepository,
  FindCategoryByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { CreateCategoryControllerFactory } from '@main/factories/category'
import { CreateCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/category')
jest.mock('@application/usecases/category')
jest.mock('@presentation/controllers/category')
jest.mock('@presentation/helpers')

describe('[Factories] Create Category Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      findCategoryByConditionRepository: FindCategoryByConditionPrismaRepository
      createCategoryRepository: CreateCategoryPrismaRepository
      createCategoryUseCase: CreateCategoryUC
      createCategoryController: CreateCategoryController
    } = CreateCategoryControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.findCategoryByConditionRepository).toBeInstanceOf(
      FindCategoryByConditionPrismaRepository
    )
    expect(factoryResult.createCategoryRepository).toBeInstanceOf(
      CreateCategoryPrismaRepository
    )
    expect(factoryResult.createCategoryUseCase).toBeInstanceOf(CreateCategoryUC)
    expect(factoryResult.createCategoryController).toBeInstanceOf(
      CreateCategoryController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    CreateCategoryControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(FindCategoryByConditionPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(CreateCategoryPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(CreateCategoryUC).toHaveBeenCalledWith(
      expect.any(FindCategoryByConditionPrismaRepository),
      expect.any(CreateCategoryPrismaRepository)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(CreateCategoryController).toHaveBeenCalledWith(
      expect.any(CreateCategoryUC),
      expect.any(HttpGenericResponse)
    )
  })
})
