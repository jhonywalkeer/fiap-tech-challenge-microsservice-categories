import { GenerateUUID } from '@common/utils/generators'

describe('[Generators] Generate UUID', () => {
  it('should generate a valid UUID', () => {
    const uuid = GenerateUUID()
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    expect(uuid).toMatch(uuidRegex)
  })

  it('should generate unique UUIDs', () => {
    const uuidA = GenerateUUID()
    const uuidB = GenerateUUID()
    expect(uuidA).not.toBe(uuidB)
  })
})
