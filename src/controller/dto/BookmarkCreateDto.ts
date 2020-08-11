import { IsDefined, IsPositive, validateOrReject } from 'class-validator'

export default class BookmarkCreateDto {
  @IsDefined({ message: 'memberId는 undefined가 될 수 없습니다.' })
  @IsPositive({ message: 'memberId는 양수 값이어야 합니다.' })
  private memberId: number = 0

  @IsDefined({ message: 'greetingId는 undefined가 될 수 없습니다.' })
  @IsPositive({ message: 'greetingId는 양수 값이어야 합니다.' })
  private greetingId: number = 0

  @IsDefined({ message: 'isOn는 undefined가 될 수 없습니다.' })
  private isOn: boolean = false

  public setMemberId(memberId: number): BookmarkCreateDto {
    this.memberId = memberId
    return this
  }

  public setGreetingId(greetingId: number): BookmarkCreateDto {
    this.greetingId = greetingId
    return this
  }

  public setIsOn(isOn: boolean): BookmarkCreateDto {
    this.isOn = isOn
    return this
  }

  public async validate(): Promise<void> {
    await validateOrReject(this)
  }
}
