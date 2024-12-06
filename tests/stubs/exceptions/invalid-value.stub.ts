import { StatusCode, ErrorName } from '@common/enums'
import { ValueIncorrectError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'

export const InvalidValueStub: HttpException = new HttpException(
  StatusCode.BadRequest,
  ErrorName.InvalidParameters,
  ValueIncorrectError(Field.Order)
)
