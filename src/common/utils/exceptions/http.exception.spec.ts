import { StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

describe('HttpException', () => {
  it('should create an instance with the correct statusCode', () => {
    const exception = new HttpException(
      StatusCode.BadRequest,
      'BadRequestError',
      'Invalid request'
    )

    expect(exception.statusCode).toBe(StatusCode.BadRequest)
    expect(exception.name).toBe('BadRequestError')
    expect(exception.message).toBe('Invalid request')
  })

  it('should set custom stack only when statusCode is InternalServerError and stack is provided', () => {
    const customStack = 'Detailed error'
    const exception = new HttpException(
      StatusCode.InternalServerError,
      'InternalError',
      'Internal error',
      customStack
    )

    expect(exception.stack).toBe(customStack)
  })

  it('should not set custom stack for status codes other than InternalServerError', () => {
    const unnecessaryStack = 'Unnecessary detail'
    const exception = new HttpException(
      StatusCode.BadRequest,
      'BadRequestError',
      'Invalid request',
      unnecessaryStack
    )

    expect(exception.stack).not.toBe(unnecessaryStack)
  })
})
