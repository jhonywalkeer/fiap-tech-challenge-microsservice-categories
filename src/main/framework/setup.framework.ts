import { Queue, ServerConfig } from '@common/constants'
import { VersionApiIdentify } from '@common/utils/identifiers'
import { Logger } from '@common/utils/loggers'
import { PollEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  DeleteMessageAdapter,
  ReadMessageAdapter
} from '@main/adapters/queues/consumers'
import { PollQueueAdapter } from '@main/adapters/queues/pollers'
import { RouterFramework } from '@main/framework'
import { RateLimiter } from '@presentation/middlewares'
import cors from 'cors'
import express, { Express } from 'express'

export const SetupFramework = async (): Promise<void> => {
  const port: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : ServerConfig.Port
  const host: string = ServerConfig.Host
  const baseUrl: string = `${process.env.HOST}:${port}`
  const framework: Express = express()
  const db: DatabaseConnection = new DatabaseConnection()
  const isDbConnected: boolean = await db.isConnected()
  const rateLimiter: RateLimiter = new RateLimiter(ServerConfig.RateLimitConfig)
  const documentation: string = `${baseUrl}${ServerConfig.ApiVersion}${ServerConfig.DocumentationRoute}`
  const pollQueue = new PollQueueAdapter(
    new ReadMessageAdapter(),
    new DeleteMessageAdapter()
  )
  const eventPolling = new PollEventGateway(pollQueue)

  if (!isDbConnected) {
    Logger.error(
      'Não foi possível conectar com o banco de dados! Aplicação esta sendo finalizada'
    )
    process.exit(1)
  }

  framework.use(cors())
  framework.use(rateLimiter.handle.bind(rateLimiter))
  framework.use(express.json())

  eventPolling.execute({
    queue: Queue.Category.Name
  })

  RouterFramework(framework)

  framework.listen(port, host, () => {
    Logger.info('Banco de dados conectado com sucesso!')
    Logger.info(`Servidor rodando em ${baseUrl}`)
    Logger.info(`API executando na versao ${VersionApiIdentify()}`)
    Logger.info(`Documentacao da API disponivel em: ${documentation}`)
  })
}
