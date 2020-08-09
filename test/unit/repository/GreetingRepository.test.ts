import { Connection, UpdateResult } from 'typeorm'

import { Greeting } from '@entity/Greeting'
import { initDatabase } from '@infrastructure/typeorm'
import GreetingRepository from '@repository/GreetingRepository'

import { GreetingFactory } from '../../support/GreetingFactory'

describe('Repository :: GreetingRepoistory 클래스 테스트', () => {
  let dbConnection: Connection
  let greetingRepository: GreetingRepository

  beforeAll(async () => {
    dbConnection = await initDatabase()
    greetingRepository = dbConnection.getCustomRepository(GreetingRepository)
  })

  afterEach(async () => {
    await GreetingFactory.deleteAll()
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  describe('findAll 메소드는', () => {
    test('조건에 부합하는 인사말 리스트를 반환한다.', async () => {
      await GreetingFactory.create({ isDeleted: false })

      const [greetings, total]: [Array<Greeting>, number] = await greetingRepository.findAll({
        where: { isDeleted: false },
      })

      expect(greetings[0].id).toBe('1')
      expect(total).toBeGreaterThan(0)
    })
  })

  describe('findOneBy 메소드는', () => {
    test('Id를 통해 인사말을 반환한다.', async () => {
      await GreetingFactory.create({ isDeleted: false })

      const findGreeting: Greeting = (await greetingRepository.findOneBy({ id: 1, isDeleted: false })) as Greeting

      expect(findGreeting).not.toBeUndefined()
      expect(findGreeting.id).toBe('1')
    })
  })

  describe('createOrUpdate 메소드는', () => {
    test('인사말을 등록한다.', async () => {
      const greetingId: string = '1'
      const greeting: Greeting = new Greeting()

      greeting.situation = '생일'
      greeting.honorific = '반말'
      greeting.sentenceLength = '1줄'
      greeting.contents = '생일 축하해!!'

      // when
      const createdGreeting: Greeting = await greetingRepository.createOrUpdate(greeting)

      // then
      expect(createdGreeting.id).toBe(greetingId)
    })
  })

  describe('increaseCount 메소드는', () => {
    test('북마크 Count의 값을 +1 한다.', async () => {
      await GreetingFactory.create({ bookmarkCount: 10 })

      const { raw }: UpdateResult = await greetingRepository.increaseCount({ id: 1, isDeleted: false })
      const greeting: Greeting = (await greetingRepository.findOneBy({ id: 1, isDeleted: false })) as Greeting

      expect(raw.changedRows).toBe(1)
      expect(greeting.bookmarkCount).toBe(11)
    })
  })

  describe('decreaseCount 메소드는', () => {
    test('북마크 Count의 값을 -1 한다.', async () => {
      await GreetingFactory.create({ bookmarkCount: 10 })

      const { raw }: UpdateResult = await greetingRepository.decreaseCount({ id: 1, isDeleted: false })
      const greeting: Greeting = (await greetingRepository.findOneBy({ id: 1, isDeleted: false })) as Greeting

      expect(raw.changedRows).toBe(1)
      expect(greeting.bookmarkCount).toBe(9)
    })
  })
})
