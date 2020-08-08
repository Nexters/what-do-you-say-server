import { IsString, validateOrReject } from 'class-validator'
import { Greeting } from '@entity/Greeting'

export default class GreetingCreateDto {
  @IsString({ message: 'situation는 string값이어야 합니다.' })
  private situation = ''

  @IsString({ message: 'honorific는 string값이어야 합니다.' })
  private honorific = ''

  @IsString({ message: 'sentenceLength는 string값이어야 합니다.' })
  private sentenceLength = ''

  @IsString({ message: 'contents는 string값이어야 합니다.' })
  private contents = ''

  public setSituation(situation: string): GreetingCreateDto {
    this.situation = situation
    return this
  }

  public setHonorific(honorific: string): GreetingCreateDto {
    this.honorific = honorific
    return this
  }

  public setSentenceLength(sentenceLength: string): GreetingCreateDto {
    this.sentenceLength = sentenceLength
    return this
  }

  public setContents(contents: string): GreetingCreateDto {
    this.contents = contents
    return this
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

  public static toEntity(greetingCreateDto: GreetingCreateDto): Greeting {
    const greeting: Greeting = new Greeting()

    greeting.situation = greetingCreateDto.getSituation()
    greeting.honorific = greetingCreateDto.getHonorific()
    greeting.sentenceLength = greetingCreateDto.getSentenceLength()
    greeting.contents = greetingCreateDto.getContents()

    return greeting
  }
}
