import { FindCategoryByIdDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { CategoryEntity } from '@domain/entities'
import { FindCategoryByIdUseCase } from '@domain/usecases/category'
import { FindCategoryByIdMock, FindedCategoryByIdMock } from '@mocks/categories'
import { FindCategoryByIdController } from '@presentation/controllers/category'

describe('[Controllers] Find Category by Id Controller', () => {
  it('should return find the category by id', async () => {
    const findCategoryByIdUC: FindCategoryByIdUseCase = {
      execute: jest.fn().mockResolvedValue(FindedCategoryByIdMock)
    }
    const findCategoryByIdPresenter: ResponseHandler<CategoryEntity> = {
      response: jest.fn().mockReturnValue(FindedCategoryByIdMock)
    }

    const findCategoryByIdController: Controller<CategoryEntity> =
      new FindCategoryByIdController(
        findCategoryByIdUC,
        findCategoryByIdPresenter
      )

    const request: HttpRequest = {
      params: FindCategoryByIdMock
    }

    const response: HttpResponse<CategoryEntity> =
      await findCategoryByIdController.handle(request)

    expect(findCategoryByIdController.handle).toBeInstanceOf(Function)
    expect(findCategoryByIdUC.execute).toHaveBeenCalledTimes(1)
    expect(findCategoryByIdUC.execute).toHaveBeenCalledWith(
      Object.assign(new FindCategoryByIdDTO(request.params.id))
    )
    expect(findCategoryByIdPresenter.response).toHaveBeenCalledTimes(1)
    expect(findCategoryByIdPresenter.response).toHaveBeenCalledWith(
      FindedCategoryByIdMock,
      StatusCode.Sucess
    )
    expect(response).toEqual(FindedCategoryByIdMock)
  })
})
