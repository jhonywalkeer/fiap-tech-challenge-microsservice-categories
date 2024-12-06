import { InternalServerError } from '@common/errors'

describe('InternalServerStub', () => {
  it('should return an instance of HttpException', () => {
    const message = 'Internal Server Error'
    const error = InternalServerError(message)

    expect(error).toEqual(message)
  })
})
