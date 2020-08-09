import { Bookmark } from '@entity/Bookmark'
import { getRepository } from 'typeorm'

export const BookmarkFactory = {
  build: (attrs: Partial<Bookmark> = {}) => {
    const bookmarkAttr: Partial<Bookmark> = {
      isOn: true,
      memberId: 1,
      ...attrs,
    }

    return getRepository(Bookmark).create(bookmarkAttr)
  },

  create: async (attrs: Partial<Bookmark> = {}) => {
    const bookmark = BookmarkFactory.build(attrs)
    return getRepository(Bookmark).save(bookmark)
  },

  deleteAll: async () => {
    await getRepository(Bookmark).query('SET FOREIGN_KEY_CHECKS = 0')
    await getRepository(Bookmark).query('TRUNCATE TABLE bookmark')
    await getRepository(Bookmark).query('TRUNCATE TABLE greeting')
    await getRepository(Bookmark).query('SET FOREIGN_KEY_CHECKS = 1')
  },
}
