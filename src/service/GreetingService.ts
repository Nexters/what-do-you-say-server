import { Connection } from 'typeorm'

import GreetingRepository from '@repository/GreetingRepository'

export default class GreetingService {
  private readonly typeOrmConnectionForTransaction: Connection

  private readonly greetingRepository: GreetingRepository

  constructor(typeOrmConnectionForTransaction: Connection, greetingRepository: GreetingRepository) {
    this.typeOrmConnectionForTransaction = typeOrmConnectionForTransaction
    this.greetingRepository = greetingRepository
  }
}
