import { Connection, QueryRunner } from 'typeorm'

import GreetingRepository from '@repository/GreetingRepository'
import { initDatabase } from '@infrastructure/typeorm'
import { Greeting } from '@entity/Greeting'

import { GreetingFactory } from '../../support/GreetingFactory'

describe('Repository :: GreetingRepoistory 클래스 테스트', () => {
  let dbConnection: Connection
  let greetingRepository: GreetingRepository

  beforeAll(async () => {
    dbConnection = await initDatabase()
    greetingRepository = dbConnection.getCustomRepository(GreetingRepository)
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  describe('findAll 메소드는', () => {
    afterEach(async () => {
      await GreetingFactory.deleteAll()
    })

    test('조건에 부합하는 인사말 리스트를 반환한다.', async () => {
      await GreetingFactory.create({ isDeleted: false })

      const greetings: Array<Greeting> = await greetingRepository.findAll({ isDeleted: false })

      expect(greetings.length).toBeGreaterThan(0)
    })
  })

  describe('findOneBy 메소드는', () => {
    afterEach(async () => {
      await GreetingFactory.deleteAll()
    })

    test('Id를 통해 인사말을 반환한다.', async () => {
      await GreetingFactory.create({ isDeleted: false })

      const findGreeting: Greeting = (await greetingRepository.findOneBy({ id: 1, isDeleted: false })) as Greeting

      expect(findGreeting).not.toBeUndefined()
      expect(findGreeting.id).toBe('1')
    })
  })

  describe('createOrUpdate 메소드는', () => {
    let queryRunner: QueryRunner

    afterEach(async () => {
      await GreetingFactory.deleteAll()
    })

    test('인사말을 등록한다.', async () => {
      // given
      queryRunner = dbConnection.createQueryRunner()

      const greetingId: string = '1'
      const greeting: Greeting = new Greeting()

      greeting.situation = '생일'
      greeting.honorific = '반말'
      greeting.sentenceLength = '2줄'
      greeting.contents = '생일 축하해!!'

      // when
      const createdGreeting: Greeting = await greetingRepository.createOrUpdate(queryRunner, greeting)

      // then
      expect(createdGreeting.id).toBe(greetingId)
    })
  })
})
