import { IsDefined, IsOptional, IsPositive, IsString, validateOrReject } from 'class-validator'
import { Greeting } from '@entity/Greeting'

export default class GreetingUpdateDto {
  @IsDefined({ message: 'Id는 undefined가 될 수 없습니다.' })
  @IsPositive({ message: 'Id는 양수 값이어야 합니다.' })
  private greetingId: number = 0

  @IsOptional()
  @IsString({ message: 'situation는 string값이어야 합니다.' })
  private situation: string = ''

  @IsOptional()
  @IsString({ message: 'honorific는 string값이어야 합니다.' })
  private honorific: string = ''

  @IsOptional()
  @IsString({ message: 'sentenceLength는 string값이어야 합니다.' })
  private sentenceLength: string = ''

  @IsOptional()
  @IsString({ message: 'contents는 string값이어야 합니다.' })
  private contents: string = ''

  public setGreetingId(greetingId: number): GreetingUpdateDto {
    this.greetingId = greetingId
    return this
  }

  public setSituation(situation: string): GreetingUpdateDto {
    this.situation = situation
    return this
  }

  public setHonorific(honorific: string): GreetingUpdateDto {
    this.honorific = honorific
    return this
  }

  public setSentenceLength(sentenceLength: string): GreetingUpdateDto {
    this.sentenceLength = sentenceLength
    return this
  }

  public setContents(contents: string): GreetingUpdateDto {
    this.contents = contents
    return this
  }

  public getGreetingId(): number {
    return this.greetingId
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

  public getContents(): string {
    return this.contents
  }

  public async validate(): Promise<void> {
    await validateOrReject(this)
  }

  public static toEntity(greetingUpdateDto: GreetingUpdateDto): Greeting {
    const greeting: Greeting = new Greeting()

    greeting.id = greetingUpdateDto.getGreetingId()
    greeting.situation = greetingUpdateDto.getSituation()
    greeting.honorific = greetingUpdateDto.getHonorific()
    greeting.sentenceLength = greetingUpdateDto.getSentenceLength()
    greeting.contents = greetingUpdateDto.getContents()

    return greeting
  }
}
