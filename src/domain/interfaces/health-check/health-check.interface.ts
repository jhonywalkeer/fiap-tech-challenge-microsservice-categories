import { HealthCheckStatus } from '@domain/interfaces/health-check'

export interface HealthCheck extends HealthCheckStatus {
  api: HealthCheckStatus
  database: HealthCheckStatus
}
