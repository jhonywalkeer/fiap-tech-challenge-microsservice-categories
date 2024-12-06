import { DeleteCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { DeleteCategoryUseCase } from '@domain/usecases/category'

export class DeleteCategoryController implements Controller<void> {
  constructor(
    private readonly deleteCategoryUC: DeleteCategoryUseCase,
    private readonly deleteCategoryPresenter: ResponseHandler<void>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[DeleteCategoryController.handle]')

    const { id } = request.params
    const payload: DeleteCategoryDTO = Object.assign(new DeleteCategoryDTO(id))
    const category = await this.deleteCategoryUC.execute(payload)
    return this.deleteCategoryPresenter.response(category, StatusCode.Accepted)
  }
}
