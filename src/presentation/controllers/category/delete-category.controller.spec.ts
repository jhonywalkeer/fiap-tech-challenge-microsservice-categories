import { DeleteCategoryDTO } from '@application/dtos/category'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { DeleteCategoryUseCase } from '@domain/usecases/category'
import { InputCategoryParamMock } from '@mocks/categories'
import { DeleteCategoryController } from '@presentation/controllers/category'

describe('[Controllers] Delete Category Controller', () => {
  it('should return the category delete', async () => {
    const deleteCategoryUC: DeleteCategoryUseCase = {
      execute: jest.fn().mockResolvedValue(void 0)
    }
    const deleteCategoryPresenter: ResponseHandler<void> = {
      response: jest.fn().mockReturnValue(void 0)
    }

    const deleteCategoryController: Controller<void> =
      new DeleteCategoryController(deleteCategoryUC, deleteCategoryPresenter)

    const request: HttpRequest = {
      params: { id: InputCategoryParamMock } as DeleteCategoryDTO
    }

    const response: HttpResponse<void> =
      await deleteCategoryController.handle(request)

    expect(deleteCategoryController.handle).toBeInstanceOf(Function)
    expect(deleteCategoryUC.execute).toHaveBeenCalledTimes(1)
    expect(deleteCategoryUC.execute).toHaveBeenCalledWith(request.params)
    expect(deleteCategoryPresenter.response).toHaveBeenCalledTimes(1)
    expect(deleteCategoryPresenter.response).toHaveBeenCalledWith(
      undefined,
      StatusCode.Accepted
    )
    expect(response).toBeUndefined()
  })
})
