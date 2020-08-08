import { FindConditions } from 'typeorm'

import { Greeting } from '@entity/Greeting'
import CommonGreetingRepository from '@repository/CommonGreetingRepository'

export default class GreetingService {
  private readonly greetingRepository: CommonGreetingRepository

  constructor(greetingRepository: CommonGreetingRepository) {
    this.greetingRepository = greetingRepository
  }

  public async findGreetings(): Promise<Array<Greeting>> {
    const conditions: FindConditions<Greeting> = { isDeleted: false }
    return this.greetingRepository.findAll(conditions)
  }

  public async findGreeting(greetingId: number): Promise<Greeting | undefined> {
    const conditions: FindConditions<Greeting> = { id: greetingId, isDeleted: false }
    return this.greetingRepository.findOneBy(conditions)
  }

  public async createGreeting(greeting: Greeting): Promise<number> {
    const { id }: Partial<Greeting> = await this.greetingRepository.createOrUpdate(greeting)
    return id
  }
}
