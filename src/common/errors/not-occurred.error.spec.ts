import { NotOccurredError } from '@common/errors'
import { OperationIdentify } from '@common/utils/identifiers'

describe('[Errors] Not Occurred Error', () => {
  it('should return a message with the operation and field', () => {
    const operation: string = 'operation'
    const field: string = 'field'

    expect(NotOccurredError(operation, field)).toBe(
      `Ao tentar ${OperationIdentify(operation)} ${field}, não foi possível realizar a operação!`
    )
  })
})
