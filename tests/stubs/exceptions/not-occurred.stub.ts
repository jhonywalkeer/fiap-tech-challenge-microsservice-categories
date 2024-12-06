import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'

export const NotOccurredStub = (
  statusCode: number,
  errorName: string,
  operation: string,
  field: string
): HttpException => {
  return new HttpException(
    statusCode,
    errorName,
    NotOccurredError(operation, field)
  )
}
