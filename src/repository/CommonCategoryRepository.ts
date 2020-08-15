import { FindManyOptions } from 'typeorm'
import { Category } from '@entity/Category'

export default interface CommonCategoryRepository {
  findAll(options: FindManyOptions<Category>): Promise<[Array<Category>, number]>
}
