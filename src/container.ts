import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asFunction } from 'awilix'
import { Connection } from 'typeorm'
import debug, { Debugger } from 'debug'
import path from 'path'

import GreetingRepository from '@repository/GreetingRepository'

export const initContainer = async (dbConnection: Connection | null): Promise<AwilixContainer> => {
  const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  })

  container.loadModules(
    [
      './controller/*Controller.{js,ts}',
      './service/*Service.{js,ts}',
      './repository/*Repository.{js,ts}',
      './infrastructure/express/response.{js,ts}',
      './infrastructure/express/middleware.{js,ts}',
    ],
    {
      formatName: 'camelCase',
      cwd: path.resolve(__dirname),
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
      },
    },
  )

  if (dbConnection) {
    // TypeORM Connection Injection for Transaction
    container.register({
      typeOrmConnectionForTransaction: asFunction(() => dbConnection, { lifetime: Lifetime.TRANSIENT }),
    })

    // Custom Repository Injection
    container.register({
      greetingRepository: asFunction(() => dbConnection.getCustomRepository(GreetingRepository), {
        lifetime: Lifetime.TRANSIENT,
      }),
    })
  }

  const appServerLogging: Debugger = debug('app:server')
  appServerLogging(container)

  return container
}
