import { DeleteCategoryUC } from '@application/usecases/category'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindCategoryByIdPrismaRepository,
  DeleteCategoryPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { DeleteCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

export const DeleteCategoryControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findCategoryByIdRepository = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const categoryRepository = new DeleteCategoryPrismaRepository(
    databaseConnection
  )
  const deleteCategoryUseCase = new DeleteCategoryUC(
    findCategoryByIdRepository,
    categoryRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    deleteCategoryUseCase,
    deleteCategoryController
  }
}
