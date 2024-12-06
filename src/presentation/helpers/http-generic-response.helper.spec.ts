import { HttpGenericResponse } from './http-generic-response.helper'

describe('HttpGenericResponse', () => {
  it('should return a response with body and status code', async () => {
    const genericResponse = new HttpGenericResponse()
    const body = {
      message: 'Hello, World!'
    }
    const statusCode = 200
    const message = 'Success'

    const response = await genericResponse.response(body, statusCode, message)

    expect(response).toEqual({
      body,
      statusCode,
      message
    })
  })
})
