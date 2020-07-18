import { AwilixContainer } from 'awilix'
import { initDatabase } from '@infrastructure/typeorm'
import { initContainer } from './container'
import initExpress from '@infrastructure/express'

initDatabase()
  .then(() => initContainer())
  .then((container: AwilixContainer) => initExpress(container))
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err)
  })
