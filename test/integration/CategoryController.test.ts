import { Connection } from 'typeorm'
import { Server } from 'http'
import { initDatabase } from '@infrastructure/typeorm'
import { initContainer } from '../../src/container'
import { CategoryFactory } from '../support/CategoryFactory'
import initExpress from '@infrastructure/express'
import { Property } from '@entity/Category'
import request from 'supertest'

describe('API Integration Test (WEB HTTP) :: Category', () => {
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
    await CategoryFactory.deleteAll()
  })

  describe('GET /categories', () => {
    beforeEach(async () => {
      await CategoryFactory.create({ property: Property.SITUATION, value: '생일' })
      await CategoryFactory.create({ property: Property.SITUATION, value: '설날' })
      await CategoryFactory.create({ property: Property.HONORIFIC, value: '존댓말' })
      await CategoryFactory.create({ property: Property.SENTENCE_LENGTH, value: '1줄' })
      await CategoryFactory.create({ property: Property.SENTENCE_LENGTH, value: '1줄' })
    })

    test('카테고리 리스트를 반환하고, 상태 코드 200을 응답한다.', async () => {
      const { status, body } = await request(httpExpressAppServer).get('/categories')
      const { items, total } = body

      expect(status).toBe(200)
      expect(total).toBe(5)
      expect(items[0].property).toBe('situation')
      expect(items[0].value).toBe('생일')
    })
  })
})
