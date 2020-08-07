export interface ConfigTest {
  readonly synchronize?: boolean
  readonly db?: {
    readonly database?: string
    readonly url?: string
  }
}
