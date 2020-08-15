import { Member } from '@entity/Member'

export default interface CommonMemberRepository {
  createOne(Member: Member): Promise<Member>
}
