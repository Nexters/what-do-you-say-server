import CommonMemberRepository from '@repository/CommonMemberRepository'
import { Member } from '@entity/Member'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import { FindManyOptions } from 'typeorm'
import { Bookmark } from '@entity/Bookmark'

export default class MemberService {
  private readonly memberRepository: CommonMemberRepository

  private readonly bookmarkRepository: CommonBookmarkRepository

  constructor(memberRepository: CommonMemberRepository, bookmarkRepository: CommonBookmarkRepository) {
    this.memberRepository = memberRepository
    this.bookmarkRepository = bookmarkRepository
  }

  public async signUpMembers(member: Member): Promise<number> {
    // : Promise<string>
    const { id }: Member = await this.memberRepository.createOne(member)

    return id
  }

  public async findBookmarksByMyPage(
    memberId: number,
    start: number,
    count: number,
  ): Promise<[Array<Bookmark>, number]> {
    const bookmarkOptions: FindManyOptions<Bookmark> = {
      where: { memberId, isOn: true },
      relations: ['greeting'],
      skip: start,
      take: count,
    }

    return this.bookmarkRepository.findAll(bookmarkOptions)
  }
}
