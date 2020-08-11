import { FindConditions, FindManyOptions, QueryRunner, UpdateResult } from 'typeorm'
import { Greeting } from '@entity/Greeting'

export default interface CommonGreetingRepository {
  findAll(options: FindManyOptions<Greeting>): Promise<[Array<Greeting>, number]>
  findOneBy(conditions: FindConditions<Greeting>): Promise<Greeting | undefined>
  createOne(greeting: Greeting): Promise<Greeting>
  updateOne(greetingId: number, greeting: Partial<Greeting>): Promise<UpdateResult>
  increaseCount(queryRunner: QueryRunner, conditions: FindConditions<Greeting>): Promise<UpdateResult>
  decreaseCount(queryRunner: QueryRunner, conditions: FindConditions<Greeting>): Promise<UpdateResult>
}
