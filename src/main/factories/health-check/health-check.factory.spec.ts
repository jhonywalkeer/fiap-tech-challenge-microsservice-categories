import { HealthCheckUC } from '@application/usecases/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HealthCheckControllerFactory } from '@main/factories/health-check'
import { HealthCheckController } from '@presentation/controllers/health-check'

describe('[Factories] Health Check Controller Factory', () => {
  it('should return an object with the expected properties', () => {
    const factoryResult = HealthCheckControllerFactory()

    expect(factoryResult).toHaveProperty('databaseConnection')
    expect(factoryResult).toHaveProperty('healthCheckUseCase')
    expect(factoryResult).toHaveProperty('healthCheckController')
  })

  it('should return a databaseConnection instance of DatabaseConnection', () => {
    const { databaseConnection } = HealthCheckControllerFactory()
    expect(databaseConnection).toBeInstanceOf(DatabaseConnection)
  })

  it('should return a healthCheckUseCase instance of HealthCheckUC', () => {
    const { healthCheckUseCase } = HealthCheckControllerFactory()
    expect(healthCheckUseCase).toBeInstanceOf(HealthCheckUC)
  })

  it('should return a healthCheckController instance of HealthCheckController', () => {
    const { healthCheckController } = HealthCheckControllerFactory()
    expect(healthCheckController).toBeInstanceOf(HealthCheckController)
  })
})
