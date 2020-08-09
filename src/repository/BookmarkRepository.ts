import { EntityRepository, FindManyOptions, Repository } from 'typeorm'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import { Bookmark } from '@entity/Bookmark'

@EntityRepository(Bookmark)
export default class BookmarkRepository extends Repository<Bookmark> implements CommonBookmarkRepository {
  public async findAll(options: FindManyOptions<Bookmark>): Promise<[Array<Bookmark>, number]> {
    return this.findAndCount(options)
  }
}
