import { Logger } from '@common/utils/loggers'
import { DatabaseConnection } from '@infrastructure/persistence/database'

describe('[Persistence] Database Connection', () => {
  let dbConnection: DatabaseConnection

  beforeEach(() => {
    dbConnection = new DatabaseConnection()
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await dbConnection.disconnect()
  })

  it('should connect to the database successfully', async () => {
    const mockConnect = jest.fn()
    const connectSpy = jest
      .spyOn(dbConnection, '$connect')
      .mockImplementation(mockConnect)

    await dbConnection.connect()

    expect(connectSpy).toHaveBeenCalled()
    expect(mockConnect).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if connection fails', async () => {
    const mockError = new Error('Connection failed')
    const connectSpy = jest
      .spyOn(dbConnection, '$connect')
      .mockRejectedValue(mockError)

    await expect(dbConnection.connect()).rejects.toThrow('Connection failed')
    expect(connectSpy).toHaveBeenCalled()
  })

  it('should disconnect from the database successfully', async () => {
    const disconnectSpy = jest.spyOn(dbConnection, '$disconnect')

    await dbConnection.disconnect()

    expect(disconnectSpy).toHaveBeenCalled()
    expect(disconnectSpy).toHaveBeenCalledTimes(1)
  })

  it('should return true if the database is connected', async () => {
    const querySpy = jest
      .spyOn(dbConnection, '$queryRaw')
      .mockResolvedValue([1])

    const isConnected = await dbConnection.isConnected()

    expect(querySpy).toHaveBeenCalledWith(['SELECT 1'])
    expect(isConnected).toBe(true)
  })

  it('should return false if the database is not connected', async () => {
    const mockError = new Error('Connection error')
    const querySpy = jest
      .spyOn(dbConnection, '$queryRaw')
      .mockRejectedValue(mockError)

    const loggerSpy = jest.spyOn(Logger, 'error')

    const isConnected = await dbConnection.isConnected()

    expect(querySpy).toHaveBeenCalledWith(['SELECT 1'])
    expect(loggerSpy).toHaveBeenCalledWith(mockError)
    expect(isConnected).toBe(false)
  })

  it('should handle unexpected errors gracefully', async () => {
    const unexpectedError = new Error('Unexpected error')
    const connectSpy = jest
      .spyOn(dbConnection, '$connect')
      .mockImplementation(() => {
        throw unexpectedError
      })

    await expect(dbConnection.connect()).rejects.toThrow('Unexpected error')
    expect(connectSpy).toHaveBeenCalled()
  })
})
