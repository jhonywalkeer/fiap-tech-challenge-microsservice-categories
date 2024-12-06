import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateCategoryControllerFactory,
  FindCategoryByIdControllerFactory,
  FindAllCategoriesControllerFactory,
  UpdateCategoryControllerFactory,
  DeleteCategoryControllerFactory
} from '@main/factories/category'
import { Router } from 'express'

export const CategoriesRoute = Router()

const { createCategoryController } = CreateCategoryControllerFactory()
const { findCategoryByIdController } = FindCategoryByIdControllerFactory()
const { findAllCategoriesController } = FindAllCategoriesControllerFactory()
const { updateCategoryController } = UpdateCategoryControllerFactory()
const { deleteCategoryController } = DeleteCategoryControllerFactory()

CategoriesRoute.post('/', ExpressRouteAdapter(createCategoryController))
  .get('/:id', ExpressRouteAdapter(findCategoryByIdController))
  .get('/', ExpressRouteAdapter(findAllCategoriesController))
  .patch('/:id', ExpressRouteAdapter(updateCategoryController))
  .put('/:id', ExpressRouteAdapter(updateCategoryController))
  .delete('/:id', ExpressRouteAdapter(deleteCategoryController))
