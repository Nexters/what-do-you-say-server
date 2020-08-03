import express, { Express, NextFunction, Request, Response } from 'express'
import { loadControllers, scopePerRequest } from 'awilix-express'
import { AwilixContainer } from 'awilix'
import debug, { Debugger } from 'debug'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import jsend from 'jsend'
import cors from 'cors'

import swaggerApiOption from '@infrastructure/express/swagger-api-option'
import config from '@common/config'

export default (container: AwilixContainer): Express => {
  const { host, port, env } = config

  const app: Express = express()
  const httpLogging: Debugger = debug('http')
  const appServerLogging: Debugger = debug('app:server')
  const swaggerApiSpec: object = swaggerJSDoc(swaggerApiOption)

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
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerApiSpec))

  /**
   * @swagger
   * tags:
   *  name: Health Check
   *  description: Server 상태를 확인하는 API
   */

  /**
   *  @swagger
   *  /health-check:
   *    get:
   *      summray: Server의 상태가 살아있는지 확인한다.
   *      tags: [Health Check]
   *      responses:
   *        200:
   *          description: 성공
   */
  app.use('/health-check', (req: Request, res: Response) => res.status(200).json({ healthy: true }))

  /**
   * @swagger
   * tags:
   *  name: Swagger JSON
   *  description: Swagger JSON 데이터를 내려주는 API
   */

  /**
   *  @swagger
   *  /swagger.json:
   *    get:
   *      summray: JSON 데이터를 내려준다.
   *      tags: [Swagger JSON]
   *      responses:
   *        200:
   *          description: 성공
   */
  app.use('/swagger.json', (req: Request, res: Response) => res.status(200).json({ ...swaggerApiOption }))

  app.listen(port, host, () => {
    appServerLogging('Express server listening on %s:%d, in %s mode', host, port, env)
  })

  app.on('error', (err) => {
    appServerLogging('Server failed with client error: %s', err)
  })

  return app
}
