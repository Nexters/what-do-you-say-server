import { FindConditions } from 'typeorm'
import { Greeting } from '@entity/Greeting'

export default interface CommonGreetingRepository {
  findAll(conditions: FindConditions<Greeting>): Promise<Array<Greeting>>
  findOneBy(conditions: FindConditions<Greeting>): Promise<Greeting | undefined>
  createOrUpdate(greeting: Greeting): Promise<Greeting>
}
