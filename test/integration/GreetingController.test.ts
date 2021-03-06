import jsend from 'jsend'
import request from 'supertest'
import { Server } from 'http'
import { Connection } from 'typeorm'
import { initContainer } from '../../src/container'
import { GreetingFactory } from '../support/GreetingFactory'
import { BookmarkFactory } from '../support/BookmarkFactory'
import { initDatabase } from '@infrastructure/typeorm'
import initExpress from '@infrastructure/express'
import { Greeting } from '@entity/Greeting'

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
      const greeting: Greeting = await GreetingFactory.create({
        situation: '생일',
        honorific: '반말',
        sentenceLength: '1줄',
      })
      await BookmarkFactory.create({ isOn: true, memberId: 1, greeting })
    })

    test('인사말 리스트를 반환하고, 상태 코드 200을 응답한다.', async () => {
      const greetingId: string = '1'
      const memberId: string = encodeURIComponent('1')
      const situation: string = encodeURIComponent('생일')
      const honorific: string = encodeURIComponent('반말')
      const sentenceLength: string = encodeURIComponent('1줄')
      const start: string = encodeURIComponent('0')
      const count: string = encodeURIComponent('10')

      const url: string = `/greetings?memberId=${memberId}&situation=${situation}&honorific=${honorific}&sentenceLength=${sentenceLength}&start=${start}&count=${count}`
      const { status, body } = await request(httpExpressAppServer).get(url)
      const { items } = body

      expect(status).toBe(200)
      expect(items[0].id).toBe(greetingId)
      expect(items[0].situation).toBe(decodeURIComponent(situation))
      expect(items[0].honorific).toBe(decodeURIComponent(honorific))
      expect(items[0].sentenceLength).toBe(decodeURIComponent(sentenceLength))
    })
  })

  describe('GET /greetings/:id', () => {
    beforeEach(async () => {
      await GreetingFactory.create({ isDeleted: false })
    })

    test('특정 인사말이 존재하면, 값을 반환하고 상태 코드 200을 응답한다.', async () => {
      const greetingId: string = '1'

      const { status, body } = await request(httpExpressAppServer).get(`/greetings/${greetingId}`)
      const { id } = body

      expect(status).toBe(200)
      expect(id).toBe(greetingId)
    })

    test('존재하지 않는 인사말이면, 상태 코드 404을 응답한다.', async () => {
      const greetingId: string = '2'

      const { status, body } = await request(httpExpressAppServer).get(`/greetings/${greetingId}`)
      const { message } = body

      expect(status).toBe(404)
      expect(jsend.isValid(body)).toBe(true)
      expect(message).toBe('Greeting Entity를 찾을 수 없습니다.')
    })
  })

  describe('POST /greetings', () => {
    test('유효하지 않은 정보가 있다면, 상태 코드 400을 응답한다.', async () => {
      const situation: string = '생일'
      const honorific: string = '존댓말'
      const sentenceLength: string = '1줄'
      const contents: number = 1

      const { status } = await request(httpExpressAppServer)
        .post('/greetings')
        .send({ situation, honorific, sentenceLength, contents })

      expect(status).toBe(400)
    })

    test('유효한 정보라면, 인사말을 등록하고 상태 코드 201을 응답한다.', async () => {
      const situation: string = '생일'
      const honorific: string = '존댓말'
      const sentenceLength: string = '1줄'
      const contents: string = '생일 축하해!!'

      const { status, body } = await request(httpExpressAppServer)
        .post('/greetings')
        .send({ situation, honorific, sentenceLength, contents })
      const { createdGreetingId } = body

      expect(status).toBe(201)
      expect(createdGreetingId).toBe('1')
    })
  })

  describe('PATCH /greetings', () => {
    beforeEach(async () => {
      await GreetingFactory.create({})
    })

    test('유효하지 않은 정보가 있다면, 상태 코드 400을 응답한다.', async () => {
      const greetingId: number = -123
      const situation: string = '설날'
      const contents: number = 1

      const { status } = await request(httpExpressAppServer)
        .patch('/greetings')
        .send({ greetingId, situation, contents })

      expect(status).toBe(400)
    })

    test('유효한 정보라면, 인사말을 수정하고 상태 코드 200을 응답한다.', async () => {
      const greetingId: number = 1
      const situation: string = '설날'
      const contents: string = '새해 복 많이 받으세요'

      const { status, body } = await request(httpExpressAppServer)
        .patch('/greetings')
        .send({ greetingId, situation, contents })

      expect(status).toBe(200)
      expect(body.id).toBe(greetingId.toString())
      expect(body.situation).toBe(situation)
      expect(body.contents).toBe(contents)
    })
  })
})
