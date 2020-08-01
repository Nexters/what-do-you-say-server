import express, { Express, NextFunction, Request, Response } from 'express'
import { loadControllers, scopePerRequest } from 'awilix-express'
import { AwilixContainer } from 'awilix'
import debug, { Debugger } from 'debug'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import jsend from 'jsend'
import cors from 'cors'

import swaggerOption from '@infrastructure/express/swagger-option'
import config from '@common/config'

export default (container: AwilixContainer): Express => {
  const { host, port, env } = config

  const app: Express = express()
  const httpLogging: Debugger = debug('http')
  const appServerLogging: Debugger = debug('app:server')
  const swaggerSpec: object = swaggerJSDoc(swaggerOption)

  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    httpLogging(`${req.method} ${req.url}`)
    next()
  })

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(jsend.middleware)

  app.use(scopePerRequest(container))
  app.use(loadControllers('../../controller/*Controller.{js,ts}', { cwd: __dirname }))
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  app.get('/health-check', (req: Request, res: Response) => res.status(200).json({ healthy: true }))

  app.listen(port, host, () => {
    appServerLogging('Express server listening on %s:%d, in %s mode', host, port, env)
  })

  app.on('error', (err) => {
    appServerLogging('Server failed with clinetError: %s', err)
  })

  return app
}
