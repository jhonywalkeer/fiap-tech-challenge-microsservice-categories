import { InvalidParamError } from './invalid-param.error'

describe('[Errors] Invalid Param Error', () => {
  it('should return a message when param is invalid', () => {
    const message: string = InvalidParamError()

    expect(message).toBe(
      'Informe os parâmetros corretamentos para a requisição!'
    )
  })
})
