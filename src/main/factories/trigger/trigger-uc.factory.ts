import {
  FindAllCategoriesUC,
  FindCategoryByIdUC
} from '@application/usecases/category'
import { CategoryEvents } from '@domain/enums'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindAllCategoriesPrismaRepository,
  FindCategoryByIdPrismaRepository
} from '@infrastructure/persistence/database/repositories/category'
import { SendMessageAdapter } from '@main/adapters/queues/producers'

export class TriggerUCFactory {
  static execute(usecase: string, message: any): any | null {
    const findAllUC = new FindAllCategoriesUC(
      new FindAllCategoriesPrismaRepository(new DatabaseConnection())
    )
    const findByIdUC = new FindCategoryByIdUC(
      new FindCategoryByIdPrismaRepository(new DatabaseConnection()),
      new SendEventGateway(new SendMessageAdapter())
    )

    switch (usecase) {
      case CategoryEvents.FindById:
        return findByIdUC.execute({ ...message, event: true })
      case CategoryEvents.FindAll:
        return findAllUC.execute({ ...message, event: true })
      default:
        return null
    }
  }
}
