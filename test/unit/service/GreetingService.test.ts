import { Connection } from 'typeorm'
import { Greeting } from '@entity/Greeting'
import GreetingService from '@service/GreetingService'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'

describe('Service :: GreetingService 클래스 테스트', () => {
  describe('findGreetings 메소드는', () => {
    const mockTypeOrmConnectionForTransaction: Connection = {} as Connection

    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<Array<Greeting>> => Promise.resolve([{ isDeleted: false } as Greeting]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      createOrUpdate: (): Promise<Greeting> => Promise.resolve({} as Greeting),
    }

    const greetingService = new GreetingService(mockTypeOrmConnectionForTransaction, mockGreetingRepository)

    test('인사말 리스트를 반환한다.', async () => {
      const greetings: Array<Greeting> = await greetingService.findGreetings()

      expect(greetings.length).toBe(1)
      expect(greetings[0].isDeleted).toBe(false)
    })
  })

  describe('findGreeting 메소드는', () => {
    const mockTypeOrmConnectionForTransaction: Connection = {} as Connection

    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<Array<Greeting>> => Promise.resolve([{} as Greeting]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({ id: 1, isDeleted: false } as Greeting),
      createOrUpdate: (): Promise<Greeting> => Promise.resolve({} as Greeting),
    }

    const greetingService = new GreetingService(mockTypeOrmConnectionForTransaction, mockGreetingRepository)

    test('인사말이 존재하면, 값을 반환한다.', async () => {
      const greetingId = 1

      const greeting: Greeting = (await greetingService.findGreeting(greetingId)) as Greeting

      expect(greeting.id).toBe(greetingId)
      expect(greeting.isDeleted).toBe(false)
    })
  })
})
