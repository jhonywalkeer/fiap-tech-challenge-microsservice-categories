import { CreateCategoryUC } from '@application/usecases/category'
import { CategoryEntity } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateCategoryPrismaRepository,
  FindCategoryByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { CreateCategoryController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

export const CreateCategoryControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const findCategoryByConditionRepository: FindCategoryByConditionPrismaRepository =
    new FindCategoryByConditionPrismaRepository(databaseConnection)
  const createCategoryRepository: CreateCategoryPrismaRepository =
    new CreateCategoryPrismaRepository(databaseConnection)
  const createCategoryUseCase: CreateCategoryUC = new CreateCategoryUC(
    findCategoryByConditionRepository,
    createCategoryRepository
  )
  const genericSucessPresenter: HttpGenericResponse<CategoryEntity> =
    new HttpGenericResponse<CategoryEntity>()
  const createCategoryController: CreateCategoryController =
    new CreateCategoryController(createCategoryUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    findCategoryByConditionRepository,
    createCategoryRepository,
    createCategoryUseCase,
    createCategoryController
  }
}
