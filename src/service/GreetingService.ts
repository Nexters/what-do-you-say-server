import { Connection, FindConditions } from 'typeorm'

import CommonGreetingRepository from '@repository/CommonGreetingRepository'
import { Greeting } from '@entity/Greeting'

export default class GreetingService {
  private readonly typeOrmConnectionForTransaction: Connection

  private readonly greetingRepository: CommonGreetingRepository

  constructor(typeOrmConnectionForTransaction: Connection, greetingRepository: CommonGreetingRepository) {
    this.typeOrmConnectionForTransaction = typeOrmConnectionForTransaction
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
}
