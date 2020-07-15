import { ConfigAll } from './all'
import { ConfigTest } from './test'
import { ConfigDevelopment } from './development'

export interface ConfigIndex {
  [key: string]: object
  readonly all: ConfigAll
  readonly test: ConfigTest
  readonly development: ConfigDevelopment
}
