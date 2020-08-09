import { Connection } from 'typeorm'
import { Bookmark } from '@entity/Bookmark'
import { initDatabase } from '@infrastructure/typeorm'
import { BookmarkFactory } from '../../support/BookmarkFactory'
import { GreetingFactory } from '../../support/GreetingFactory'
import BookmarkRepository from '@repository/BookmarkRepository'
import { Greeting } from '@entity/Greeting'

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
})
