import { EntityRepository, FindConditions, FindManyOptions, QueryRunner, Repository, UpdateResult } from 'typeorm'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import { Bookmark } from '@entity/Bookmark'

@EntityRepository(Bookmark)
export default class BookmarkRepository extends Repository<Bookmark> implements CommonBookmarkRepository {
  public async findAll(options: FindManyOptions<Bookmark>): Promise<[Array<Bookmark>, number]> {
    return this.findAndCount(options)
  }

  public async findOneBy(conditions: FindConditions<Bookmark>): Promise<Bookmark | undefined> {
    return this.findOne(conditions)
  }

  public async createOne(queryRunner: QueryRunner, bookmark: Bookmark): Promise<Bookmark> {
    return queryRunner.manager.save(bookmark)
  }

  public async updateOne(
    queryRunner: QueryRunner,
    bookmarkId: number,
    bookmark: Partial<Bookmark>,
  ): Promise<UpdateResult> {
    return queryRunner.manager.update('Bookmark', bookmarkId, bookmark)
  }
}
