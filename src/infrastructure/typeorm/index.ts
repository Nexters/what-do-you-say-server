import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Connection, createConnection } from 'typeorm'
import config from '@common/config'

export const initDatabase = async (): Promise<Connection> => {
  const { synchronize, db } = config
  const { type, timezone, entitiesPath, logging, database, url } = db

  return createConnection({
    url,
    type,
    timezone,
    database,
    synchronize,
    entities: [entitiesPath],
    charset: 'utf8mb4_general_ci',
    namingStrategy: new SnakeNamingStrategy(),
    logging,
  })
}
