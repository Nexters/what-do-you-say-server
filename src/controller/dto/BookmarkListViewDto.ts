import GreetingViewDto from '@controller/dto/GreetingViewDto'
import { Bookmark } from '@entity/Bookmark'

export default class BookmarkListViewDto {
  private id: number = 0

  private isOn: boolean = false

  private greeting: GreetingViewDto | undefined = undefined

  public setId(id: number): BookmarkListViewDto {
    this.id = id
    return this
  }

  public setIsOn(isOn: boolean): BookmarkListViewDto {
    this.isOn = isOn
    return this
  }

  public setGreeting(greeting: GreetingViewDto | undefined): BookmarkListViewDto {
    this.greeting = greeting
    return this
  }

  public static of(bookmark: Bookmark): BookmarkListViewDto {
    return new BookmarkListViewDto()
      .setId(bookmark.id)
      .setIsOn(bookmark.isOn)
      .setGreeting(GreetingViewDto.of(bookmark.greeting))
  }
}
