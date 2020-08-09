import { FindConditions, FindManyOptions, UpdateResult } from 'typeorm'
import { Greeting } from '@entity/Greeting'

export default interface CommonGreetingRepository {
  findAll(options: FindManyOptions<Greeting>): Promise<[Array<Greeting>, number]>
  findOneBy(conditions: FindConditions<Greeting>): Promise<Greeting | undefined>
  createOrUpdate(greeting: Greeting): Promise<Greeting>
  increaseCount(conditions: FindConditions<Greeting>): Promise<UpdateResult>
  decreaseCount(conditions: FindConditions<Greeting>): Promise<UpdateResult>
}
