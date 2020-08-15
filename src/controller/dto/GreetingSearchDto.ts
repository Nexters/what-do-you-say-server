import { IsDefined, IsOptional, IsPositive, IsString, validateOrReject } from 'class-validator'
import { Greeting } from '@entity/Greeting'

export default class GreetingSearchDto {
  @IsDefined({ message: 'memberId는 undefined가 될 수 없습니다.' })
  @IsPositive({ message: 'memberId는 양수 값이어야 합니다.' })
  private memberId: number = 0

  @IsDefined({ message: 'situation는 undefined가 될 수 없습니다.' })
  @IsString({ message: 'situation는 string값이어야 합니다.' })
  private situation: string = ''

  @IsDefined({ message: 'honorific는 undefined가 될 수 없습니다.' })
  @IsString({ message: 'honorific는 string값이어야 합니다.' })
  private honorific: string = ''

  @IsDefined({ message: 'sentenceLength는 undefined가 될 수 없습니다.' })
  @IsString({ message: 'sentenceLength는 string값이어야 합니다.' })
  private sentenceLength: string = ''

  @IsOptional()
  private start: number = 0

  @IsOptional()
  private count: number = 10

  public setMemberId(memberId: number): GreetingSearchDto {
    this.memberId = memberId
    return this
  }

  public setSituation(situation: string): GreetingSearchDto {
    this.situation = situation
    return this
  }

  public setHonorific(honorific: string): GreetingSearchDto {
    this.honorific = honorific
    return this
  }

  public setSentenceLength(sentenceLength: string): GreetingSearchDto {
    this.sentenceLength = sentenceLength
    return this
  }

  public setStart(start: number): GreetingSearchDto {
    this.start = start
    return this
  }

  public setCount(count: number): GreetingSearchDto {
    this.count = count
    return this
  }

  public getMemberId(): number {
    return this.memberId
  }

  public getSituation(): string {
    return this.situation
  }

  public getHonorific(): string {
    return this.honorific
  }

  public getSentenceLength(): string {
    return this.sentenceLength
  }

  public getStart(): number {
    return this.start
  }

  public getCount(): number {
    return this.count
  }

  public async validate(): Promise<void> {
    await validateOrReject(this)
  }

  public static toEntity(greetingSearchDto: GreetingSearchDto): Greeting {
    const greeting: Greeting = new Greeting()

    greeting.situation = greetingSearchDto.getSituation()
    greeting.honorific = greetingSearchDto.getHonorific()
    greeting.sentenceLength = greetingSearchDto.getSentenceLength()

    return greeting
  }
}
