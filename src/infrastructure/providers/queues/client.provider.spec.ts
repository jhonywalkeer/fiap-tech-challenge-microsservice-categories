import { ConnectQueueProvider } from '@infrastructure/providers/queues'

jest.mock('@aws-sdk/client-sqs', () => ({
  SQSClient: jest.fn().mockImplementation(() => ({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'fakeAccessKey',
      secretAccessKey: 'fakeSecretKey'
    }
  }))
}))

describe('Connect Queue Provider', () => {
  const TEST_ENV = { ...process.env }

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...TEST_ENV }
  })

  afterAll(() => {
    process.env = TEST_ENV
  })

  it('should return the correct configuration if the environment variables are set', () => {
    process.env.AWS_REGION = 'us-east-1'
    process.env.AWS_ACCESS_KEY_ID = 'fakeAccessKey'
    process.env.AWS_SECRET_KEY = 'fakeSecretKey'

    const config = ConnectQueueProvider()

    expect(config).toEqual({
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'fakeAccessKey',
        secretAccessKey: 'fakeSecretKey'
      }
    })
  })

  it('should throw an error if environment variables are not set', () => {
    delete process.env.AWS_REGION
    delete process.env.AWS_ACCESS_KEY_ID
    delete process.env.AWS_SECRET_KEY

    expect(() => ConnectQueueProvider()).toThrow()
  })
})
