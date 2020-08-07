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

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
  example: path.join(__dirname, '../../../.env.sample'),
  allowEmptyValues: true,
})

const index: ConfigIndex = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '9000', 10),
    host: process.env.HOST || '0.0.0.0',
    synchronize: process.env.SYNC_FORCE || false,
    jwtSecret: process.env.JWT_SECRET || undefined,
    db: {
      type: 'mysql',
      timezone: '+09:00',
      entitiesPath: path.join(__dirname, '../../entity/*.{js,ts}'),
      logging: false,
    },
  },
  test: {
    synchronize: true,
    db: {
      database: requireProcessEnv('DB_TEST_DATABASE'),
      url: requireProcessEnv('DB_TEST_URL'),
    },
  },
  development: {
    db: {
      database: requireProcessEnv('DB_TEST_DATABASE'),
      url: requireProcessEnv('DB_TEST_URL'),
    },
  },
  production: {
    db: {
      database: requireProcessEnv('DB_PRODUCTION_DATABASE'),
      url: requireProcessEnv('DB_PRODUCTION_URL'),
    },
  },
}

const { env } = index.all
module.exports = merge(index.all, index[env])
export default module.exports
