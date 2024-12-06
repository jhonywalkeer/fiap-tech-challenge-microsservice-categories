import { FindAllCategoriesDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { CategoryEntity } from '@domain/entities'
import { FindAllCategoriesUseCase } from '@domain/usecases/category'
import { FindAllPaginetedCategoriesMock } from '@mocks/categories'
import { PaginationInputMock } from '@mocks/pagination'
import { FindAllCategoriesController } from '@presentation/controllers/category'

describe('[Controllers] Find All Category Controller', () => {
  it('should return find all the categories', async () => {
    const findAllCategoriesUC: FindAllCategoriesUseCase = {
      execute: jest.fn().mockResolvedValue(FindAllPaginetedCategoriesMock)
    }
    const findAllCategoriesPresenter: ResponseHandler<
      PaginateResponse<CategoryEntity>
    > = {
      response: jest.fn().mockReturnValue(FindAllPaginetedCategoriesMock)
    }

    const findAllCategoriesController: Controller<
      PaginateResponse<CategoryEntity>
    > = new FindAllCategoriesController(
      findAllCategoriesUC,
      findAllCategoriesPresenter
    )

    const request: HttpRequest = {
      query: PaginationInputMock
    }

    const response: HttpResponse<PaginateResponse<CategoryEntity>> =
      await findAllCategoriesController.handle(request)

    expect(findAllCategoriesController.handle).toBeInstanceOf(Function)
    expect(findAllCategoriesUC.execute).toHaveBeenCalledTimes(1)
    expect(findAllCategoriesUC.execute).toHaveBeenCalledWith(
      Object.assign(
        new FindAllCategoriesDTO(
          request.query.page,
          request.query.limit,
          request.query.sort,
          request.query.order
        )
      )
    )
    expect(findAllCategoriesPresenter.response).toHaveBeenCalledTimes(1)
    expect(findAllCategoriesPresenter.response).toHaveBeenCalledWith(
      FindAllPaginetedCategoriesMock,
      StatusCode.Sucess
    )
    expect(response).toEqual(FindAllPaginetedCategoriesMock)
  })
})
