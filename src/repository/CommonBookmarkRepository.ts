import { FindConditions, FindManyOptions, QueryRunner, UpdateResult } from 'typeorm'
import { Bookmark } from '@entity/Bookmark'

export default interface CommonBookmarkRepository {
  findAll(options: FindManyOptions<Bookmark>): Promise<[Array<Bookmark>, number]>
  findOneBy(conditions: FindConditions<Bookmark>): Promise<Bookmark | undefined>
  createOne(queryRunner: QueryRunner, bookmark: Bookmark): Promise<Bookmark>
  updateOne(queryRunner: QueryRunner, bookmarkId: number, bookmark: Partial<Bookmark>): Promise<UpdateResult>
}
