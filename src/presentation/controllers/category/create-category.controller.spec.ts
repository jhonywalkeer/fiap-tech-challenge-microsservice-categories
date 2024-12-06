import { CreateCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { CategoryEntity } from '@domain/entities'
import { CreateCategoryUseCase } from '@domain/usecases/category'
import { CreateCategoryMock, CreatedCategoryMock } from '@mocks/categories'
import { CreateCategoryController } from '@presentation/controllers/category'

describe('[Controllers] Create Category Controller', () => {
  it('should return the user created', async () => {
    const createCategoryUC: CreateCategoryUseCase = {
      execute: jest.fn().mockResolvedValue(CreatedCategoryMock)
    }
    const createCategoryPresenter: ResponseHandler<CategoryEntity> = {
      response: jest.fn().mockReturnValue(CreatedCategoryMock)
    }

    const createCategoryController: Controller<CategoryEntity> =
      new CreateCategoryController(createCategoryUC, createCategoryPresenter)

    const request: HttpRequest = {
      body: CreateCategoryMock as CreateCategoryDTO
    }

    const response: HttpResponse<CategoryEntity> =
      await createCategoryController.handle(request)

    expect(createCategoryController.handle).toBeInstanceOf(Function)
    expect(createCategoryUC.execute).toHaveBeenCalledTimes(1)
    expect(createCategoryUC.execute).toHaveBeenCalledWith(CreateCategoryMock)
    expect(createCategoryPresenter.response).toHaveBeenCalledTimes(1)
    expect(createCategoryPresenter.response).toHaveBeenCalledWith(
      CreatedCategoryMock,
      StatusCode.Created
    )
    expect(response).toEqual(CreatedCategoryMock)
  })
})
