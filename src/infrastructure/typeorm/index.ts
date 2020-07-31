import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Connection, createConnection } from 'typeorm'
import config from '@common/config'

export const initDatabase = async (): Promise<Connection> => {
  const { syncForce, db } = config
  const { type, timezone, entitiesPath, logging, database, uri, replication } = db

  return createConnection({
    type,
    timezone,
    database,
    url: uri,
    synchronize: syncForce,
    extra: { charset: 'utf8mb4_general_ci' },
    entities: [entitiesPath],
    replication: replication ? { ...replication } : null,
    namingStrategy: new SnakeNamingStrategy(),
    logging,
  })
}
