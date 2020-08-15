import { getRepository } from 'typeorm'
import { Category, Property } from '@entity/Category'

export const CategoryFactory = {
  build: (attrs: Partial<Category> = {}) => {
    const categoryAttr: Partial<Category> = {
      property: Property.SITUATION,
      value: '생일',
      ...attrs,
    }
    return getRepository(Category).create(categoryAttr)
  },

  create: async (attrs: Partial<Category> = {}) => {
    const category = CategoryFactory.build(attrs)
    return getRepository(Category).save(category)
  },

  deleteAll: async () => getRepository(Category).query('TRUNCATE TABLE category'),
}
