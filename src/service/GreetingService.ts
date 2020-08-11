import { pickBy, isNull, isUndefined } from 'lodash'
import { FindConditions, FindManyOptions, UpdateResult } from 'typeorm'

import CommonGreetingRepository from '@repository/CommonGreetingRepository'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import { GreetingListView } from '@common/types/greeting-list-view'
import { Greeting } from '@entity/Greeting'
import { Bookmark } from '@entity/Bookmark'

export default class GreetingService {
  private readonly greetingRepository: CommonGreetingRepository

  private readonly bookmarkRepository: CommonBookmarkRepository

  constructor(greetingRepository: CommonGreetingRepository, bookmarkRepository: CommonBookmarkRepository) {
    this.greetingRepository = greetingRepository
    this.bookmarkRepository = bookmarkRepository
  }

  public async findGreetings(
    memberId: number,
    start: number,
    count: number,
  ): Promise<[Array<GreetingListView>, number]> {
    const greetingOptions: FindManyOptions<Greeting> = {
      where: { isDeleted: false },
      skip: start,
      take: count,
    }

    const bookmarkOptions: FindManyOptions<Bookmark> = {
      where: { memberId, isOn: true },
      relations: ['greeting'],
    }

    const [[greetings, total], [bookmarks]]: [
      [Array<Greeting>, number],
      [Array<Bookmark>, number],
    ] = await Promise.all([
      this.greetingRepository.findAll(greetingOptions),
      this.bookmarkRepository.findAll(bookmarkOptions),
    ])

    return [this._buildResultGreetings(greetings, bookmarks), total]
  }

  public async findGreeting(greetingId: number): Promise<Greeting | undefined> {
    const conditions: FindConditions<Greeting> = { id: greetingId, isDeleted: false }

    return this.greetingRepository.findOneBy(conditions)
  }

  public async createGreeting(greeting: Greeting): Promise<number> {
    const { id }: Greeting = await this.greetingRepository.createOne(greeting)

    return id
  }

  public async updateGreeing(greeting: Greeting): Promise<Greeting | undefined> {
    const partialGreeting: Partial<Greeting> = pickBy({ ...greeting }, (v) => !isNull(v) && !isUndefined(v))

    const conditions: FindConditions<Greeting> = { id: greeting.id, isDeleted: false }

    const { raw }: UpdateResult = await this.greetingRepository.updateOne(greeting.id, partialGreeting)

    if (!raw.changedRows) return undefined

    return this.greetingRepository.findOneBy(conditions)
  }

  private _buildResultGreetings = (greetings: Array<Greeting>, bookmarks: Array<Bookmark>): Array<GreetingListView> => {
    return this._checkBookMarkStatus(greetings, this._buildFlagForIdChecking(bookmarks))
  }

  private _buildFlagForIdChecking = (bookmarks: Array<Bookmark>): object => {
    return bookmarks.reduce((acc: object, { greeting }: Bookmark) => {
      acc[greeting.id] = true
      return acc
    }, {})
  }

  private _checkBookMarkStatus = (greetings: Array<Greeting>, flagForIdChecking: object): Array<GreetingListView> => {
    return greetings.map((greeting: Greeting) => {
      return { ...greeting, isBookMarking: !!flagForIdChecking[greeting.id] }
    })
  }
}
