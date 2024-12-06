import { FindAllCategoriesUC } from '@application/usecases/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllCategoriesPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { FindAllCategoriesControllerFactory } from '@main/factories/category'
import { FindAllCategoriesController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/category')
jest.mock('@application/usecases/category')
jest.mock('@presentation/controllers/category')
jest.mock('@presentation/helpers')

describe('[Factories] Find All Category Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      categoryRepository: FindAllCategoriesPrismaRepository
      findAllCategoriesUseCase: FindAllCategoriesUC
      findAllCategoriesController: FindAllCategoriesController
    } = FindAllCategoriesControllerFactory()

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.categoryRepository).toBeInstanceOf(
      FindAllCategoriesPrismaRepository
    )
    expect(factoryResult.findAllCategoriesUseCase).toBeInstanceOf(
      FindAllCategoriesUC
    )
    expect(factoryResult.findAllCategoriesController).toBeInstanceOf(
      FindAllCategoriesController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    FindAllCategoriesControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(FindAllCategoriesPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(FindAllCategoriesUC).toHaveBeenCalledWith(
      expect.any(FindAllCategoriesPrismaRepository)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(FindAllCategoriesController).toHaveBeenCalledWith(
      expect.any(FindAllCategoriesUC),
      expect.any(HttpGenericResponse)
    )
  })
})
