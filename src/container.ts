import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer } from 'awilix'
import path from 'path'

export const initContainer = async (): Promise<AwilixContainer> => {
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

  // eslint-disable-next-line no-console
  console.log(container)

  return container
}
