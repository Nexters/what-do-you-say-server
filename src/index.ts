import debug, { Debugger } from 'debug'
import { Connection } from 'typeorm'
import { AwilixContainer } from 'awilix'
import { initContainer } from './container'
import { initDatabase } from '@infrastructure/typeorm'
import initExpress from '@infrastructure/express'

initDatabase()
  .then((dbConnection: Connection) => initContainer(dbConnection))
  .then((container: AwilixContainer) => initExpress(container))
  .catch((err: Error) => {
    const initErrorLogging: Debugger = debug('app:init-error')
    initErrorLogging('Server failed to start due to error: %s', err)
  })
