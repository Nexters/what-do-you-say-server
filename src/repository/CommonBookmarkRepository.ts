import { FindManyOptions } from 'typeorm'
import { Bookmark } from '@entity/Bookmark'

export default interface CommonBookmarkRepository {
  findAll(options: FindManyOptions<Bookmark>): Promise<[Array<Bookmark>, number]>
}
