import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asFunction } from 'awilix'
import { Connection } from 'typeorm'
import debug, { Debugger } from 'debug'
import path from 'path'

import GreetingRepository from '@repository/GreetingRepository'
import BookmarkRepository from '@repository/BookmarkRepository'
import CategoryRepository from '@repository/CategoryRepository'

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
    // Custom Repository Injection - Greeting
    container.register({
      greetingRepository: asFunction(() => dbConnection.getCustomRepository(GreetingRepository), {
        lifetime: Lifetime.TRANSIENT,
      }),
    })

    // Custom Repository Injection - Bookmark
    container.register({
      bookmarkRepository: asFunction(() => dbConnection.getCustomRepository(BookmarkRepository), {
        lifetime: Lifetime.TRANSIENT,
      }),
    })

    // Custom Repository Injection - Category
    container.register({
      categoryRepository: asFunction(() => dbConnection.getCustomRepository(CategoryRepository), {
        lifetime: Lifetime.TRANSIENT,
      }),
    })

    // TypeORM Connection Injection For Transaction
    container.register({
      typeOrmConnection: asFunction(() => dbConnection, { lifetime: Lifetime.TRANSIENT }),
    })
  }

  const appServerLogging: Debugger = debug('app:server')
  appServerLogging(container)

  return container
}
