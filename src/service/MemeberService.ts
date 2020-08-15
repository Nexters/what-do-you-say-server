import CommonMemberRepository from '@repository/CommonMemberRepository'
import { Member } from '@entity/Member'

export default class MemberService {
  private readonly memberRepository: CommonMemberRepository

  constructor(memberRepository: CommonMemberRepository) {
    this.memberRepository = memberRepository
  }

  public async signUpMembers(member: Member): Promise<number> {
    // : Promise<string>
    const { id }: Member = await this.memberRepository.createOne(member)

    return id
  }
}
