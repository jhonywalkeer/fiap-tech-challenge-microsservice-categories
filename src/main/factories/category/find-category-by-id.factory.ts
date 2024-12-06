import { FindCategoryByIdUC } from '@application/usecases/category'
import { CategoryEntity } from '@domain/entities'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindCategoryByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/category'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { FindCategoryByIdController } from '@presentation/controllers/category'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindCategoryByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const sendMessageAdapter = new SendMessageAdapter()
  const sendEvent = new SendEventGateway(sendMessageAdapter)
  const categoryRepository = new FindCategoryByIdPrismaRepository(
    databaseConnection
  )
  const findCategoryByIdUseCase = new FindCategoryByIdUC(
    categoryRepository,
    sendEvent
  )
  const genericSucessPresenter = new HttpGenericResponse<CategoryEntity>()
  const findCategoryByIdController = new FindCategoryByIdController(
    findCategoryByIdUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    categoryRepository,
    findCategoryByIdUseCase,
    findCategoryByIdController
  }
}
