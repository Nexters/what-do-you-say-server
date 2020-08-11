import request from 'supertest'
import { Server } from 'http'
import { Connection } from 'typeorm'
import { initDatabase } from '@infrastructure/typeorm'
import { initContainer } from '../../src/container'
import initExpress from '@infrastructure/express'
import { GreetingFactory } from '../support/GreetingFactory'
import { BookmarkFactory } from '../support/BookmarkFactory'
import { Greeting } from '@entity/Greeting'
import { Bookmark } from '@entity/Bookmark'

describe('API Integration Test (WEB HTTP) :: Bookmark', () => {
  let dbConnection: Connection
  let httpExpressAppServer: Server

  beforeAll(async () => {
    dbConnection = await initDatabase()
    httpExpressAppServer = await initExpress(await initContainer(dbConnection))
  })

  afterAll(async () => {
    await dbConnection.close()
    await httpExpressAppServer.close()
  })

  afterEach(async () => {
    await GreetingFactory.deleteAll()
  })

  describe('POST /bookmarks', () => {
    beforeEach(async () => {
      await GreetingFactory.create({ bookmarkCount: 10 })
      await BookmarkFactory.create({
        isOn: true,
        memberId: 2,
        greeting: await GreetingFactory.create({ bookmarkCount: 50 }),
      })
    })

    test('북마크를 등록하고, 상태 코드 200을 응답한다.', async () => {
      const memberId: number = 1
      const greetingId: number = 1
      const isOn: boolean = true

      const { status, body } = await request(httpExpressAppServer)
        .post('/bookmarks')
        .send({ memberId, greetingId, isOn })

      const greeting: Greeting | undefined = (await dbConnection
        .getRepository(Greeting)
        .findOne({ id: greetingId, isDeleted: false })) as Greeting

      const bookmark: Bookmark | undefined = (await dbConnection
        .getRepository(Bookmark)
        .findOne({ memberId, greeting })) as Bookmark

      expect(status).toBe(200)
      expect(body.isComplete).toBe(true)
      expect(greeting.bookmarkCount).toBe(11)
      expect(bookmark.isOn).toBe(true)
    })

    test('북마크를 취소하고, 상태 코드 200을 응답한다.', async () => {
      const memberId: number = 2
      const greetingId: number = 2
      const isOn: boolean = false

      const { status, body } = await request(httpExpressAppServer)
        .post('/bookmarks')
        .send({ memberId, greetingId, isOn })

      const greeting: Greeting | undefined = (await dbConnection
        .getRepository(Greeting)
        .findOne({ id: greetingId, isDeleted: false })) as Greeting

      const bookmark: Bookmark | undefined = (await dbConnection
        .getRepository(Bookmark)
        .findOne({ memberId, greeting })) as Bookmark

      expect(status).toBe(200)
      expect(body.isComplete).toBe(true)
      expect(greeting.bookmarkCount).toBe(49)
      expect(bookmark.isOn).toBe(false)
    })

    test('유효하지 않는 값이 있다면, 상태 코드 400을 응답한다.', async () => {
      const memberId: string = '123'
      const greetingId: number = 2
      const isOn: boolean = false

      const { status } = await request(httpExpressAppServer).post('/bookmarks').send({ memberId, greetingId, isOn })

      expect(status).toBe(400)
    })
  })
})
