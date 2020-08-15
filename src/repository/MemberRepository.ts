import { EntityRepository, Repository } from 'typeorm'
import CommonMemberRepository from '@repository/CommonMemberRepository'
import { Member } from '@entity/Member'

@EntityRepository(Member)
export default class MemberRepository extends Repository<Member> implements CommonMemberRepository {
  public async createOne(member: Member): Promise<Member> {
    return this.save(member)
  }

  // public async createOne()
}
