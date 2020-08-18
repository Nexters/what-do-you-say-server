import request from 'supertest'
import { Server } from 'http'
import { Connection } from 'typeorm'
import { initDatabase } from '@infrastructure/typeorm'
import { initContainer } from '../../src/container'
import { BookmarkFactory } from '../support/BookmarkFactory'
import { GreetingFactory } from '../support/GreetingFactory'
import initExpress from '@infrastructure/express'
import { Greeting } from '@entity/Greeting'

describe('API Integration Test (WEB HTTP) :: Member', () => {
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

  describe('GET /members/:memberId/my-page/bookmarks', () => {
    beforeEach(async () => {
      const greeting: Greeting = await GreetingFactory.create({
        situation: '생일',
        honorific: '반말',
        sentenceLength: '1줄',
      })
      await BookmarkFactory.create({ isOn: true, memberId: 1, greeting })
    })

    test('해당 회원이 북마크 한 리스트를 반환한다', async () => {
      const memberId: number = 1
      const start: number = 0
      const count: number = 0

      const { status, body } = await request(httpExpressAppServer).get(
        `/members/${memberId}/my-page/bookmarks?start=${start}&count=${count}`,
      )
      const { items, total } = body

      expect(status).toBe(200)
      expect(total).toBe(1)
      expect(items[0].id).toBe('1')
      expect(items[0].isOn).toBe(true)
      expect(items[0].greeting.id).toBe('1')
    })
  })
})
