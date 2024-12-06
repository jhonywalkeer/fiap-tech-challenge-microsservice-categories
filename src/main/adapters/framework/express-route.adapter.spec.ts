import { Controller } from '@application/protocols/http'
import { StatusCode, ApiMethod } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { ExpressRouteAdapter } from '@main/adapters/framework'
import { Request, Response, NextFunction } from 'express'

describe('[Adapters] Express Route Adapter', () => {
  let mockController: Controller<any>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: NextFunction

  beforeEach(() => {
    mockController = {
      handle: jest.fn()
    }
    mockRequest = {
      query: {},
      params: {},
      body: {},
      headers: {},
      method: ApiMethod.Get
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }
    mockNext = jest.fn()
  })

  it('should call controller handle with correct parameters', async () => {
    const adapter = ExpressRouteAdapter(mockController)
    await adapter(mockRequest as Request, mockResponse as Response, mockNext)
    expect(mockController.handle).toHaveBeenCalledWith({
      query: mockRequest.query,
      params: mockRequest.params,
      body: mockRequest.body,
      headers: mockRequest.headers
    })
  })

  it('should respond with json and correct status code for GET method with pagination', async () => {
    mockRequest.method = ApiMethod.Get
    mockRequest.query = { page: '1', limit: '10' }
    mockController.handle = jest.fn().mockResolvedValue({
      statusCode: StatusCode.Sucess,
      body: { data: 'test' }
    })
    const adapter = ExpressRouteAdapter(mockController)
    await adapter(mockRequest as Request, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.Sucess)
    expect(mockResponse.json).toHaveBeenCalledWith({ data: 'test' })
    expect(mockNext).toHaveBeenCalled()
  })

  it('should respond with Accepted status code', async () => {
    mockController.handle = jest.fn().mockResolvedValue({
      statusCode: StatusCode.Accepted,
      body: null
    })
    const adapter = ExpressRouteAdapter(mockController)
    await adapter(mockRequest as Request, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.Accepted)
    expect(mockResponse.send).toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled()
  })

  it('should respond with json and correct status code for non-GET method', async () => {
    mockRequest.method = ApiMethod.Post
    mockController.handle = jest.fn().mockResolvedValue({
      statusCode: StatusCode.Created,
      body: { data: 'test' }
    })
    const adapter = ExpressRouteAdapter(mockController)
    await adapter(mockRequest as Request, mockResponse as Response, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.Created)
    expect(mockResponse.json).toHaveBeenCalledWith({ data: { data: 'test' } })
    expect(mockNext).toHaveBeenCalled()
  })

  it('should handle HttpException and respond with correct status code and message', async () => {
    const error = new HttpException(
      StatusCode.BadRequest,
      'Bad Request',
      'BadRequestException'
    )
    mockController.handle = jest.fn().mockRejectedValue(error)
    const adapter = ExpressRouteAdapter(mockController)
    await adapter(mockRequest as Request, mockResponse as Response, mockNext)

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.BadRequest)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status_code: StatusCode.BadRequest,
      name: error.name,
      message: error.message
    })
  })
})
