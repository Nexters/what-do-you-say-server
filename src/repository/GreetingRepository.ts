import { EntityRepository, FindConditions, QueryRunner, Repository } from 'typeorm'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'
import { Greeting } from '@entity/Greeting'

@EntityRepository(Greeting)
export default class GreetingRepository extends Repository<Greeting> implements CommonGreetingRepository {
  public async findAll(conditions: FindConditions<Greeting>): Promise<Array<Greeting>> {
    return this.find(conditions)
  }

  public async findOneBy(conditions: FindConditions<Greeting>): Promise<Greeting | undefined> {
    return this.findOne(conditions)
  }

  public async createOrUpdate(queryRunner: QueryRunner, greeting: Greeting): Promise<Greeting> {
    return queryRunner.manager.save(greeting)
  }
}
