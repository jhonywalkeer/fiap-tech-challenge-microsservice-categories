import { CreateCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { CreateCategoryUseCase } from '@domain/usecases/category'

export class CreateCategoryController implements Controller<CategoryEntity> {
  constructor(
    private readonly createCategoryUC: CreateCategoryUseCase,
    private readonly createCategoryPresenter: ResponseHandler<CategoryEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[CreateCategoryController.handle]')

    const { name, description } = request.body
    const payload: CreateCategoryDTO = Object.assign(
      new CreateCategoryDTO(name, description)
    )
    const category: CategoryEntity =
      await this.createCategoryUC.execute(payload)
    return this.createCategoryPresenter.response(category, StatusCode.Created)
  }
}
