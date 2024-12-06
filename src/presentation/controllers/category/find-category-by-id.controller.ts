import { FindCategoryByIdDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'

export class FindCategoryByIdController implements Controller<CategoryEntity> {
  constructor(
    private readonly findCategoryByIdUC: FindCategoryByIdUseCase,
    private readonly findCategoryByIdPresenter: ResponseHandler<CategoryEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[FindCategoryByIdController.handle]')

    const { id } = request.params
    const parameters: FindCategoryByIdDTO = Object.assign(
      new FindCategoryByIdDTO(id)
    )
    const category: CategoryEntity =
      await this.findCategoryByIdUC.execute(parameters)
    return this.findCategoryByIdPresenter.response(category, StatusCode.Sucess)
  }
}
