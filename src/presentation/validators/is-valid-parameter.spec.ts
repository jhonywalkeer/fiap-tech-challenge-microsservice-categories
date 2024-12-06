import { ErrorName, StatusCode } from '@common/enums'
import { InvalidParamError } from '@common/errors'
import { IsValidParameterValidator } from '@presentation/validators'
import { InvalidParamStub } from '@stubs/exceptions'

describe('[Validators] Is Valid Parameter', () => {
  it('should return the value if it is valid', () => {
    const value: string = '1'
    const result: string = IsValidParameterValidator(value)
    expect(result).toBe(value)
  })

  it('should throw an error when the value is not valid', () => {
    const value: string = '1<script>'

    expect(() => {
      IsValidParameterValidator(value)
    }).toThrow(InvalidParamStub)

    expect(InvalidParamStub.statusCode).toBe(StatusCode.BadRequest)
    expect(InvalidParamStub.name).toBe(ErrorName.InvalidParameters)
    expect(InvalidParamStub.message).toBe(InvalidParamError())
  })
})
