import { Connection, FindConditions, QueryRunner } from 'typeorm'
import { Bookmark } from '@entity/Bookmark'
import { Greeting } from '@entity/Greeting'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'

export default class BookmarkService {
  public readonly bookmarkRepository: CommonBookmarkRepository

  public readonly greetingRepository: CommonGreetingRepository

  public readonly typeOrmConnection: Connection

  constructor(
    bookmarkRepository: CommonBookmarkRepository,
    greetingRepository: CommonGreetingRepository,
    typeOrmConnection: Connection,
  ) {
    this.bookmarkRepository = bookmarkRepository
    this.greetingRepository = greetingRepository
    this.typeOrmConnection = typeOrmConnection
  }

  public async registerOrCancelBookmark(memberId: number, greetingId: number, isOn: boolean): Promise<boolean> {
    const greeting: Greeting | undefined = await this._findGreetingBy(greetingId)

    if (!greeting) return false

    const findBookmark: Bookmark | undefined = await this._findBookmarkBy(memberId, greeting)

    const bookmark: Bookmark = new Bookmark()

    bookmark.isOn = isOn
    bookmark.memberId = memberId
    bookmark.greeting = greeting

    if (findBookmark) bookmark.id = findBookmark.id

    const conditions: FindConditions<Greeting> = { id: greeting.id, isDeleted: false }

    const queryRunner: QueryRunner = this.typeOrmConnection.createQueryRunner()

    try {
      await queryRunner.startTransaction()

      if (isOn) {
        await this._registerBookmark(queryRunner, bookmark, conditions)
      } else {
        await this._cancelBookmark(queryRunner, bookmark, conditions)
      }

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    } finally {
      await queryRunner.release()
    }

    return true
  }

  private async _findGreetingBy(greetingId: number): Promise<Greeting | undefined> {
    const greetingConditions: FindConditions<Greeting> = { id: greetingId, isDeleted: false }

    return this.greetingRepository.findOneBy(greetingConditions)
  }

  private async _findBookmarkBy(memberId: number, greeting: Greeting): Promise<Bookmark | undefined> {
    const bookmarkConditions: FindConditions<Bookmark> = { memberId, greeting }

    return this.bookmarkRepository.findOneBy(bookmarkConditions)
  }

  private async _registerBookmark(
    queryRunner: QueryRunner,
    bookmark: Bookmark,
    conditions: FindConditions<Greeting>,
  ): Promise<void> {
    await this.bookmarkRepository.createOne(queryRunner, bookmark)
    await this.greetingRepository.increaseCount(queryRunner, conditions)
  }

  private async _cancelBookmark(
    queryRunner: QueryRunner,
    bookmark: Bookmark,
    conditions: FindConditions<Greeting>,
  ): Promise<void> {
    await this.bookmarkRepository.updateOne(queryRunner, bookmark.id, bookmark)
    await this.greetingRepository.decreaseCount(queryRunner, conditions)
  }
}
