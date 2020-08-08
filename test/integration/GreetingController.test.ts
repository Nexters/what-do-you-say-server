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

  describe('POST /greetings', () => {
    test('유효하지 않은 정보가 있다면, 상태 코드 400을 응답한다.', async () => {
      const situation: string = '생일'
      const honorific: string = '존댓말'
      const sentenceLength: string = '1줄'
      const contents: number = 1

      const { status, body } = await request(httpExpressAppServer)
        .post('/greetings')
        .send({ situation, honorific, sentenceLength, contents })

      expect(status).toBe(400)
      expect(jsend.isValid(body)).toBe(true)
    })

    test('유효한 정보라면, 인사말을 등록하고 상태 코드 201을 응답한다.', async () => {
      const situation: string = '생일'
      const honorific: string = '존댓말'
      const sentenceLength: string = '1줄'
      const contents: string = '생일 축하해!!'

      const { status, body } = await request(httpExpressAppServer)
        .post('/greetings')
        .send({ situation, honorific, sentenceLength, contents })
      const { createdGreetingId } = body.data

      expect(status).toBe(201)
      expect(jsend.isValid(body)).toBe(true)
      expect(createdGreetingId).toBe('1')
    })
  })
})
