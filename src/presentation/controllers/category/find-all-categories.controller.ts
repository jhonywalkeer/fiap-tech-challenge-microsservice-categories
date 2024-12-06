import { FindAllCategoriesDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity } from '@domain/entities'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'

export class FindAllCategoriesController
  implements Controller<PaginateResponse<CategoryEntity>>
{
  constructor(
    private readonly findAllUserUC: FindAllCategoriesUseCase,
    private readonly findAllUserPresenter: ResponseHandler<
      PaginateResponse<CategoryEntity>
    >
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[FindAllCategoriesController.handle]')

    const { query } = request
    const categories: PaginateResponse<CategoryEntity> =
      await this.findAllUserUC.execute(
        Object.assign(
          new FindAllCategoriesDTO(
            query.page,
            query.limit,
            query.sort,
            query.order
          )
        )
      )

    return this.findAllUserPresenter.response(categories, StatusCode.Sucess)
  }
}
