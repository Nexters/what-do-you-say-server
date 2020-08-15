import { IsString, validateOrReject, IsEnum } from 'class-validator'
import { Member } from '@entity/Member'

enum LoginType {
  APPLE = 'apple',
  KAKAO = 'kakao',
  FACEBOOK = 'facebook',
}

export default class MemberCreateDto {
  @IsString({ message: 'email는 string값이어야 합니다.' })
  private email: string = ''

  @IsString({ message: 'key는 string값이어야 합니다.' })
  private key: string = ''

  @IsEnum(LoginType)
  private type: LoginType = LoginType.APPLE

  public setEmail(email: string): MemberCreateDto {
    this.email = email
    return this
  }

  public setKey(key: string): MemberCreateDto {
    this.key = key
    return this
  }

  public setType(type: LoginType): MemberCreateDto {
    this.type = type
    return this
  }

  public getEmail(): string {
    return this.email
  }

  public getKey(): string {
    return this.key
  }

  public getType(): LoginType {
    return this.type
  }

  public async validate(): Promise<void> {
    await validateOrReject(this)
  }

  public static toEntity(memberCreateDto: MemberCreateDto): Member {
    const member: Member = new Member()

    member.email = memberCreateDto.getEmail()
    member.key = memberCreateDto.getKey()
    member.type = memberCreateDto.getType()

    return member
  }
}
