import { Connection } from 'typeorm'
import { CategoryFactory } from '../../support/CategoryFactory'
import { initDatabase } from '@infrastructure/typeorm'

import CategoryRepository from '@repository/CategoryRepository'
import { Category, Property } from '@entity/Category'

describe('Repository :: CategoryRepository 클래스 테스트', () => {
  let dbConnection: Connection
  let categoryRepository: CategoryRepository

  beforeAll(async () => {
    dbConnection = await initDatabase()
    categoryRepository = dbConnection.getCustomRepository(CategoryRepository)
  })

  beforeEach(async () => {
    await CategoryFactory.create({ property: Property.SITUATION, value: '생일' })
    await CategoryFactory.create({ property: Property.SITUATION, value: '설날' })
    await CategoryFactory.create({ property: Property.HONORIFIC, value: '반말' })
    await CategoryFactory.create({ property: Property.HONORIFIC, value: '존댓말' })
    await CategoryFactory.create({ property: Property.SENTENCE_LENGTH, value: '1줄' })
    await CategoryFactory.create({ property: Property.SENTENCE_LENGTH, value: '1줄' })
  })

  afterEach(async () => {
    await CategoryFactory.deleteAll()
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  describe('findAll 메소드는', () => {
    test('상황, 존대정도, 문장길이와 같은 카테고리 리스트를 반환한다.', async () => {
      const isDisplay: boolean = true

      const [categories, total]: [Array<Category>, number] = await categoryRepository.findAll({ where: { isDisplay } })

      expect(total).toBe(6)
      expect(categories[0].id).toBe(1)
      expect(categories[0].property).toBe('situation')
      expect(categories[0].value).toBe('생일')
    })
  })
})
