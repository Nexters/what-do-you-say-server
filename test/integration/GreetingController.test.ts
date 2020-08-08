import jsend from 'jsend'
import request from 'supertest'
import { Server } from 'http'
import { Connection } from 'typeorm'
import { initContainer } from '../../src/container'
import { GreetingFactory } from '../support/GreetingFactory'
import { initDatabase } from '@infrastructure/typeorm'
import initExpress from '@infrastructure/express'

describe('API Integration Test (WEB HTTP) :: Greeting', () => {
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

  describe('GET /greetings', () => {
    beforeEach(async () => {
      await GreetingFactory.create({ isDeleted: false })
    })

    test('인사말 리스트를 반환하고, 상태 코드 200을 응답한다.', async () => {
      const greetingId: string = '1'

      const { status, body } = await request(httpExpressAppServer).get('/greetings')
      const { items } = body.data

      expect(status).toBe(200)
      expect(jsend.isValid(body)).toBe(true)
      expect(items[0].id).toBe(greetingId)
    })
  })

  describe('GET /greetings/:id', () => {
    beforeEach(async () => {
      await GreetingFactory.create({ isDeleted: false })
    })

    test('특정 인사말이 존재하면, 값을 반환하고 상태 코드 200을 응답한다.', async () => {
      const greetingId: string = '1'

      const { status, body } = await request(httpExpressAppServer).get(`/greetings/${greetingId}`)
      const { id } = body.data

      expect(status).toBe(200)
      expect(jsend.isValid(body)).toBe(true)
      expect(id).toBe(greetingId)
    })

    test('존재하지 않는 인사말이면, 상태 코드 404을 응답한다.', async () => {
      const greetingId: string = '2'

      const { status, body } = await request(httpExpressAppServer).get(`/greetings/${greetingId}`)
      const { message } = body.data

      expect(status).toBe(404)
      expect(jsend.isValid(body)).toBe(true)
      expect(message).toBe('Not found Entity')
    })
  })
})
