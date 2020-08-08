import { getRepository } from 'typeorm'
import { Greeting } from '@entity/Greeting'

export const GreetingFactory = {
  build: (attrs: Partial<Greeting> = {}) => {
    const grettingAttr: Partial<Greeting> = {
      situation: '생일',
      honorific: '반말',
      sentenceLength: '2줄',
      contents: '생일 축하해!!',
      bookmarkCount: 0,
      isDeleted: false,
      version: 1,
      ...attrs,
    }
    return getRepository(Greeting).create(grettingAttr)
  },

  create: async (attrs: Partial<Greeting> = {}) => {
    const eventPromotion = GreetingFactory.build(attrs)
    return getRepository(Greeting).save(eventPromotion)
  },

  deleteAll: async () => {
    await getRepository(Greeting).query('SET FOREIGN_KEY_CHECKS = 0')
    await getRepository(Greeting).query('TRUNCATE TABLE greeting')
    await getRepository(Greeting).query('SET FOREIGN_KEY_CHECKS = 1')
  },
}
