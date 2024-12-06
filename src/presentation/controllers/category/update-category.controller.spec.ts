import { UpdateCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { CategoryEntity } from '@domain/entities'
import { UpdateCategoryUseCase } from '@domain/usecases/category'
import {
  FindCategoryByIdMock,
  FindedCategoryByIdMock,
  UpdateOtherCategoryBodyMock
} from '@mocks/categories'
import { UpdateCategoryController } from '@presentation/controllers/category'

describe('[Controllers] Update Category Controller', () => {
  it('should return update the category', async () => {
    const updateCategoryUC: UpdateCategoryUseCase = {
      execute: jest.fn().mockResolvedValue(FindedCategoryByIdMock)
    }
    const updateCategoryPresenter: ResponseHandler<CategoryEntity> = {
      response: jest.fn().mockReturnValue(FindedCategoryByIdMock)
    }

    const updateCategoryController: Controller<CategoryEntity> =
      new UpdateCategoryController(updateCategoryUC, updateCategoryPresenter)

    const request: HttpRequest = {
      params: FindCategoryByIdMock,
      body: UpdateOtherCategoryBodyMock
    }

    const response: HttpResponse<CategoryEntity> =
      await updateCategoryController.handle(request)

    expect(updateCategoryController.handle).toBeInstanceOf(Function)
    expect(updateCategoryUC.execute).toHaveBeenCalledTimes(1)
    expect(updateCategoryUC.execute).toHaveBeenCalledWith(
      Object.assign(new UpdateCategoryDTO(request.params.id, request.body))
    )
    expect(updateCategoryPresenter.response).toHaveBeenCalledTimes(1)
    expect(updateCategoryPresenter.response).toHaveBeenCalledWith(
      FindedCategoryByIdMock,
      StatusCode.Sucess
    )
    expect(response).toEqual(FindedCategoryByIdMock)
  })
})
