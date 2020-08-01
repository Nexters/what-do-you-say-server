import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asFunction } from 'awilix'
import { Connection } from 'typeorm'
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
      typeOrmConnection: asFunction(() => dbConnection, { lifetime: Lifetime.TRANSIENT }),
    })

    // Custom Repository Injection
    container.register({
      GreetingRepository: asFunction(() => dbConnection.getCustomRepository(GreetingRepository), {
        lifetime: Lifetime.TRANSIENT,
      }),
    })
  }

  // eslint-disable-next-line no-console
  console.log(container)

  return container
}
