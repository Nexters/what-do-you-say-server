import { GreetingListView } from '@common/types/greeting-list-view'

export default class GreetingListViewDto {
  private id: number | undefined

  private situation: string | undefined

  private honorific: string | undefined

  private sentenceLength: string | undefined

  private contents: string | undefined

  private bookmarkCount: number | undefined

  private isBookMarking: boolean | undefined

  private setId(id: number): GreetingListViewDto {
    this.id = id
    return this
  }

  private setSituation(situation: string): GreetingListViewDto {
    this.situation = situation
    return this
  }

  private setHonorific(honorific: string): GreetingListViewDto {
    this.honorific = honorific
    return this
  }

  private setSentenceLength(sentenceLength: string): GreetingListViewDto {
    this.sentenceLength = sentenceLength
    return this
  }

  private setContents(contents: string): GreetingListViewDto {
    this.contents = contents
    return this
  }

  private setBookmarkCount(bookmarkCount: number): GreetingListViewDto {
    this.bookmarkCount = bookmarkCount
    return this
  }

  private setIsBookMarking(isBookMarking: boolean): GreetingListViewDto {
    this.isBookMarking = isBookMarking
    return this
  }

  public static of(greeting: GreetingListView): GreetingListViewDto {
    return new GreetingListViewDto()
      .setId(greeting.id)
      .setSituation(greeting.situation)
      .setHonorific(greeting.honorific)
      .setSentenceLength(greeting.sentenceLength)
      .setContents(greeting.contents)
      .setBookmarkCount(greeting.bookmarkCount)
      .setIsBookMarking(greeting.isBookMarking)
  }
}
