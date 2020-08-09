import { UpdateResult } from 'typeorm'
import { Greeting } from '@entity/Greeting'
import { Bookmark } from '@entity/Bookmark'
import GreetingService from '@service/GreetingService'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import { GreetingListView } from '@common/types/greeting-list-view'

describe('Service :: GreetingService 클래스 테스트', () => {
  describe('findGreetings 메소드는', () => {
    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<[Array<Greeting>, number]> => Promise.resolve([[{ isDeleted: false } as Greeting], 1]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      createOne: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      updateOne: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      increaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      decreaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
    }

    const mockBookmarkRepository: CommonBookmarkRepository = {
      findAll: (): Promise<[Array<Bookmark>, number]> =>
        Promise.resolve([
          [{ isOn: true, memberId: 1, greeting: ({ id: 1, isDeleted: false } as unknown) as Greeting } as Bookmark],
          0,
        ]),
    }

    const greetingService = new GreetingService(mockGreetingRepository, mockBookmarkRepository)

    test('인사말 리스트를 반환한다.', async () => {
      const start: number = 0
      const count: number = 10

      const [greetings, total]: [Array<GreetingListView>, number] = await greetingService.findGreetings(1, start, count)

      expect(total).toBe(1)
      expect(greetings[0].isDeleted).toBe(false)
    })
  })

  describe('findGreeting 메소드는', () => {
    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<[Array<Greeting>, number]> => Promise.resolve([[{} as Greeting], 0]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({ id: 1, isDeleted: false } as Greeting),
      createOne: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      updateOne: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      increaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      decreaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
    }

    const mockBookmarkRepository: CommonBookmarkRepository = {
      findAll: (): Promise<[Array<Bookmark>, number]> => Promise.resolve([[{} as Bookmark], 0]),
    }

    const greetingService = new GreetingService(mockGreetingRepository, mockBookmarkRepository)

    test('인사말이 존재하면, 값을 반환한다.', async () => {
      const greetingId = 1

      const greeting: Greeting = (await greetingService.findGreeting(greetingId)) as Greeting

      expect(greeting.id).toBe(greetingId)
      expect(greeting.isDeleted).toBe(false)
    })
  })

  describe('createGreeting 메소드는', () => {
    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<[Array<Greeting>, number]> => Promise.resolve([[{} as Greeting], 0]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      createOne: (): Promise<Greeting> => Promise.resolve({ id: 1 } as Greeting),
      updateOne: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      increaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      decreaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
    }

    const mockBookmarkRepository: CommonBookmarkRepository = {
      findAll: (): Promise<[Array<Bookmark>, number]> => Promise.resolve([[{} as Bookmark], 0]),
    }

    const greetingService = new GreetingService(mockGreetingRepository, mockBookmarkRepository)

    test('인사말을 등록하고, Id를 반환한다.', async () => {
      const greetingId: number = 1
      const greeting: Greeting = new Greeting()

      greeting.situation = '생일'
      greeting.honorific = '반말'
      greeting.sentenceLength = '1줄'
      greeting.contents = '생일 축하해!!'

      const createdGreetingId: number = await greetingService.createGreeting(greeting)

      expect(createdGreetingId).toBe(greetingId)
    })
  })

  describe('updateGreeting 메소드는', () => {
    const mockGreetingRepository: CommonGreetingRepository = {
      findAll: (): Promise<[Array<Greeting>, number]> => Promise.resolve([[{} as Greeting], 0]),
      findOneBy: (): Promise<Greeting> => Promise.resolve({ id: 1, honorific: '존댓말' } as Greeting),
      createOne: (): Promise<Greeting> => Promise.resolve({} as Greeting),
      updateOne: (): Promise<UpdateResult> => Promise.resolve({ raw: { changedRows: 1 } } as UpdateResult),
      increaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
      decreaseCount: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
    }

    const mockBookmarkRepository: CommonBookmarkRepository = {
      findAll: (): Promise<[Array<Bookmark>, number]> => Promise.resolve([[{} as Bookmark], 0]),
    }

    const greetingService = new GreetingService(mockGreetingRepository, mockBookmarkRepository)

    test('인사말을 수정하고, 인사말을 반환한다.', async () => {
      const greeting: Greeting = new Greeting()

      greeting.id = 1
      greeting.honorific = '존댓말'

      const findGreeting: Greeting | undefined = (await greetingService.updateGreeing(greeting)) as Greeting

      expect(findGreeting.id).toBe(greeting.id)
      expect(findGreeting.honorific).toBe(greeting.honorific)
    })
  })
})
