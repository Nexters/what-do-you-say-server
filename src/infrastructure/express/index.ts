import cors from 'cors'
import jsend from 'jsend'
import morgan from 'morgan'
import express, { Request, Response } from 'express'
import { loadControllers, scopePerRequest } from 'awilix-express'
import { AwilixContainer } from 'awilix'

import config from '@common/config'

export default (container: AwilixContainer) => {
  const { host, port, env } = config

  const app = express()

  app.use(cors())
  app.use(morgan('dev'))

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(jsend.middleware)

  app.use(scopePerRequest(container))
  app.use(loadControllers('../../controller/*Controller.{js,ts}', { cwd: __dirname }))

  app.get('/health-check', (req: Request, res: Response) => res.status(200).json({ healthy: true }))

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on %s:%d, in %s mode', host, port, env)
  })

  app.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(err)
  })

  return app
}
