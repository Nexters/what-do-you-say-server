import { EntityRepository, FindConditions, FindManyOptions, Repository, UpdateResult } from 'typeorm'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'
import { Greeting } from '@entity/Greeting'

@EntityRepository(Greeting)
export default class GreetingRepository extends Repository<Greeting> implements CommonGreetingRepository {
  private readonly BOOKMARK_COUNT: string = 'bookmarkCount'

  private readonly NUMBER_ONE: number = 1

  public async findAll(options: FindManyOptions<Greeting>): Promise<[Array<Greeting>, number]> {
    return this.findAndCount(options)
  }

  public async findOneBy(conditions: FindConditions<Greeting>): Promise<Greeting | undefined> {
    return this.findOne(conditions)
  }

  public async createOrUpdate(greeting: Greeting): Promise<Greeting> {
    return this.save(greeting)
  }

  public async increaseCount(conditions: FindConditions<Greeting>): Promise<UpdateResult> {
    return this.increment(conditions, this.BOOKMARK_COUNT, this.NUMBER_ONE)
  }

  public async decreaseCount(conditions: FindConditions<Greeting>): Promise<UpdateResult> {
    return this.decrement(conditions, this.BOOKMARK_COUNT, this.NUMBER_ONE)
  }
}
