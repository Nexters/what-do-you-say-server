import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions'

export interface ConfigDevelopment {
  readonly synchronize?: boolean
  readonly db?: {
    readonly database?: string
    readonly url?: string
    readonly replication?: {
      readonly master: MysqlConnectionCredentialsOptions
      readonly slaves: MysqlConnectionCredentialsOptions[]
    }
  }
}
