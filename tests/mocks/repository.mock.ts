import { Repositories } from '@application/repositories/common'

export const RepositoryMock = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByField: jest.fn(),
  findByCondition: jest.fn(),
  findMany: jest.fn(),
  findUnique: jest.fn(),
  count: jest.fn()
} as Repositories<any>