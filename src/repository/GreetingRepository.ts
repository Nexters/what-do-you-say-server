import { EntityRepository, FindManyOptions, QueryRunner, Repository } from 'typeorm'
import { Greeting } from '@entity/Greeting'

@EntityRepository(Greeting)
export default class GreetingRepository extends Repository<Greeting> {
  public async findAll(options: FindManyOptions<Greeting>): Promise<Array<Greeting>> {
    return this.find(options)
  }

  public async findOneBy(greetingId: string): Promise<Greeting | undefined> {
    return this.findOne(greetingId)
  }

  public async createOrUpdate(queryRunner: QueryRunner, greeting: Greeting): Promise<Greeting> {
    return queryRunner.manager.save(greeting)
  }
}
