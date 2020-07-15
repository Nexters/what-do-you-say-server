export interface ConfigTest {
  readonly syncForce?: boolean
  readonly db?: {
    readonly database?: string
    readonly uri?: string
  }
}
