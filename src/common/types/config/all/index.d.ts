import { LoggerOptions } from 'typeorm/logger/LoggerOptions'
import { DatabaseType } from 'typeorm'

export interface ConfigAll {
  readonly env: string | number
  readonly port: number
  readonly host: string
  readonly synchronize: string | boolean
  readonly jwtSecret: string | undefined
  readonly db?: {
    readonly type: DatabaseType
    readonly timezone: string
    readonly entitiesPath: string
    readonly logging: LoggerOptions
  }
}
