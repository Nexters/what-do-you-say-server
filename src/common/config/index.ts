import path from 'path'
import dotenv from 'dotenv-safe'
import merge from 'lodash/merge'
import { ConfigIndex } from '@common/types/config'

const requireProcessEnv = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`)
  }
  return process.env[name] || ''
}

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.join(__dirname, '../../../.env'),
    example: path.join(__dirname, '../../../.env.sample'),
    allowEmptyValues: true,
  })
}

const index: ConfigIndex = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '9000', 10),
    host: process.env.HOST || '0.0.0.0',
    syncForce: process.env.SYNC_FORCE || false,
    jwtSecret: process.env.JWT_SECRET || undefined,
    db: {
      type: 'mysql',
      timezone: '+09:00',
      entitiesPath: path.join(__dirname, '../../entity/*.{js,ts}'),
      logging: false,
    },
  },
  test: {
    syncForce: true,
    db: {
      database: 'api_dev',
      uri: requireProcessEnv('DB_TEST_URI'),
    },
  },
  development: {
    syncForce: true,
    db: {
      replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
    },
  },
  production: {
    db: {
      replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
    },
  },
}

const { env } = index.all
module.exports = merge(index.all, index[env])
export default module.exports
