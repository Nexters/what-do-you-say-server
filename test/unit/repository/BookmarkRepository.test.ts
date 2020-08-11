import { Connection, QueryRunner, UpdateResult } from 'typeorm'
import { BookmarkFactory } from '../../support/BookmarkFactory'
import { GreetingFactory } from '../../support/GreetingFactory'
import { initDatabase } from '@infrastructure/typeorm'
import { Greeting } from '@entity/Greeting'
import { Bookmark } from '@entity/Bookmark'

import BookmarkRepository from '@repository/BookmarkRepository'

describe('Repository :: BookmarkRepository 클래스 테스트', () => {
  let dbConnection: Connection
  let bookmarkRepository: BookmarkRepository

  beforeAll(async () => {
    dbConnection = await initDatabase()
    bookmarkRepository = dbConnection.getCustomRepository(BookmarkRepository)
  })

  afterEach(async () => {
    await BookmarkFactory.deleteAll()
    await GreetingFactory.deleteAll()
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  describe('findAll 메소드는', () => {
    test('북마크 리스트를 반환한다.', async () => {
      const greeting: Greeting = await GreetingFactory.create({})
      await BookmarkFactory.create({ isOn: true, memberId: 1, greeting })

      const [bookmarks, total]: [Array<Bookmark>, number] = await bookmarkRepository.findAll({
        where: { isOn: true, memberId: 1 },
        relations: ['greeting'],
      })

      expect(bookmarks[0].id).toBe('1')
      expect(total).toBeGreaterThan(0)
    })
  })

  describe('findOneBy 메소드는', () => {
    test('북마크를 반환한다.', async () => {
      await BookmarkFactory.create({})

      const bookmark: Bookmark | undefined = (await bookmarkRepository.findOneBy({ id: 1 })) as Bookmark

      expect(bookmark.id).toBe('1')
    })
  })

  describe('createOne 메소드는', () => {
    test('북마크를 등록한다.', async () => {
      const greeting: Greeting = await GreetingFactory.create({})
      const bookmark: Bookmark = new Bookmark()
      bookmark.isOn = true
      bookmark.memberId = 1
      bookmark.greeting = greeting

      const queryRunner: QueryRunner = dbConnection.createQueryRunner()
      const createdBookmark: Bookmark = await bookmarkRepository.createOne(queryRunner, bookmark)

      expect(createdBookmark.id).toBe('1')
      expect(createdBookmark.isOn).toBe(bookmark.isOn)
      expect(createdBookmark.memberId).toBe(bookmark.memberId)
      expect(createdBookmark.greeting.id).toBe(bookmark.greeting.id)
    })
  })

  describe('updateOne', () => {
    test('북마크를 수정한다.', async () => {
      const greeting: Greeting = await GreetingFactory.create({})
      await BookmarkFactory.create({ isOn: true, memberId: 1, greeting })
      const bookmark: Bookmark = new Bookmark()
      bookmark.id = 1
      bookmark.isOn = false
      bookmark.memberId = 2

      const queryRunner: QueryRunner = dbConnection.createQueryRunner()
      const { raw }: UpdateResult = await bookmarkRepository.updateOne(queryRunner, bookmark.id, bookmark)
      const findBookmark: Bookmark | undefined = (await bookmarkRepository.findOneBy({ id: bookmark.id })) as Bookmark

      expect(raw.changedRows).toBe(1)
      expect(findBookmark.isOn).toBe(bookmark.isOn)
      expect(findBookmark.memberId).toBe(bookmark.memberId.toString())
    })
  })
})
