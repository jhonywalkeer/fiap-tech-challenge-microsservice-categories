import { UpdateCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { UpdateCategoryUseCase } from '@domain/usecases/category'

export class UpdateCategoryController implements Controller<CategoryEntity> {
  constructor(
    private readonly updateCategoryUC: UpdateCategoryUseCase,
    private readonly updateCategoryPresenter: ResponseHandler<CategoryEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[UpdateCategoryController.handle]')

    const { id } = request.params
    const { name, description } = request.body
    const parameters: UpdateCategoryDTO = Object.assign(
      new UpdateCategoryDTO(id, { name, description })
    )
    const category: CategoryEntity =
      await this.updateCategoryUC.execute(parameters)

    return this.updateCategoryPresenter.response(category, StatusCode.Sucess)
  }
}
