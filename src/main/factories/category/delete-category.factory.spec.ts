import { DeleteCategoryUC } from '@application/usecases/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindCategoryByIdPrismaRepository,
  DeleteCategoryPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { DeleteCategoryControllerFactory } from '@main/factories/category'
import { DeleteCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/category')
jest.mock('@application/usecases/category')
jest.mock('@presentation/controllers/category')
jest.mock('@presentation/helpers')

describe('[Factories] Delete Category Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      findCategoryByIdRepository: FindCategoryByIdPrismaRepository
      categoryRepository: DeleteCategoryPrismaRepository
      deleteCategoryUseCase: DeleteCategoryUC
      deleteCategoryController: DeleteCategoryController
    } = DeleteCategoryControllerFactory() as any

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.categoryRepository).toBeInstanceOf(
      DeleteCategoryPrismaRepository
    )
    expect(factoryResult.deleteCategoryUseCase).toBeInstanceOf(DeleteCategoryUC)
    expect(factoryResult.deleteCategoryController).toBeInstanceOf(
      DeleteCategoryController
    )
  })

  it('should call the constructor of each dependency with the correct parameters', () => {
    DeleteCategoryControllerFactory()

    expect(DatabaseConnection).toHaveBeenCalledTimes(1)
    expect(FindCategoryByIdPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(DeleteCategoryPrismaRepository).toHaveBeenCalledWith(
      expect.any(DatabaseConnection)
    )
    expect(DeleteCategoryUC).toHaveBeenCalledWith(
      expect.any(FindCategoryByIdPrismaRepository),
      expect.any(DeleteCategoryPrismaRepository)
    )
    expect(HttpGenericResponse).toHaveBeenCalledTimes(1)
    expect(DeleteCategoryController).toHaveBeenCalledWith(
      expect.any(DeleteCategoryUC),
      expect.any(HttpGenericResponse)
    )
  })
})
