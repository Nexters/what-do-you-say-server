import { EntityRepository, FindManyOptions, Repository } from 'typeorm'
import { Category } from '@entity/Category'
import CommonCategoryRepository from '@repository/CommonCategoryRepository'

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> implements CommonCategoryRepository {
  public async findAll(options: FindManyOptions<Category>): Promise<[Array<Category>, number]> {
    return this.findAndCount(options)
  }
}
