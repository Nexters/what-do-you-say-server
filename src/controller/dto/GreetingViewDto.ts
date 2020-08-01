import { Greeting } from '@entity/Greeting'
import { Bookmark } from '@entity/Bookmark'

export default class GreetingViewDto {
  private id: bigint | undefined

  private situation: string | undefined

  private honorific: string | undefined

  private sentenceLength: string | undefined

  private contents: string | undefined

  private bookmarkCount: number | undefined

  private bookmarks: Array<Bookmark> | undefined

  private setId(id: bigint): GreetingViewDto {
    this.id = id
    return this
  }

  private setSituation(situation: string): GreetingViewDto {
    this.situation = situation
    return this
  }

  private setHonorific(honorific: string): GreetingViewDto {
    this.honorific = honorific
    return this
  }

  private setSentenceLength(sentenceLength: string): GreetingViewDto {
    this.sentenceLength = sentenceLength
    return this
  }

  private setContents(contents: string): GreetingViewDto {
    this.contents = contents
    return this
  }

  private setBookmarkCount(bookmarkCount: number): GreetingViewDto {
    this.bookmarkCount = bookmarkCount
    return this
  }

  private setBookmarks(bookmarks: Array<Bookmark>): GreetingViewDto {
    this.bookmarks = bookmarks
    return this
  }

  public static of(greeting: Greeting): GreetingViewDto {
    return new GreetingViewDto()
      .setId(greeting.id)
      .setSituation(greeting.situation)
      .setHonorific(greeting.honorific)
      .setSentenceLength(greeting.sentenceLength)
      .setContents(greeting.contents)
      .setBookmarkCount(greeting.bookmarkCount)
      .setBookmarks(greeting.bookmarks)
  }
}
