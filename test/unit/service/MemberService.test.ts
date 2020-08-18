import CommonMemberRepository from '@repository/CommonMemberRepository'
import CommonBookmarkRepository from '@repository/CommonBookmarkRepository'
import MemberService from '@service/MemberService'
import { Member } from '@entity/Member'
import { Bookmark } from '@entity/Bookmark'
import { UpdateResult } from 'typeorm'

describe('Service :: MemberService 클래스 테스트', () => {
  describe('findBookmarksByMyPage 메소드는', () => {
    const mockMemberRepository: CommonMemberRepository = {
      createOne: (): Promise<Member> => Promise.resolve({} as Member),
    }

    const mockBookmarkRepository: CommonBookmarkRepository = {
      findAll: (): Promise<[Array<Bookmark>, number]> =>
        Promise.resolve([[{ id: 1, memberId: 1, isOn: true, greeting: { id: 1 } } as Bookmark], 1]),
      findOneBy: (): Promise<Bookmark | undefined> => Promise.resolve({} as Bookmark),
      createOne: (): Promise<Bookmark> => Promise.resolve({} as Bookmark),
      updateOne: (): Promise<UpdateResult> => Promise.resolve({} as UpdateResult),
    }

    const memberService: MemberService = new MemberService(mockMemberRepository, mockBookmarkRepository)

    test('해당 회원이 자신이 북마크한 리스트를 반환한다.', async () => {
      const memberId: number = 1
      const start: number = 0
      const count: number = 10

      const [bookmarks, total]: [Array<Bookmark>, number] = await memberService.findBookmarksByMyPage(
        memberId,
        start,
        count,
      )

      expect(total).toBe(1)
      expect(bookmarks[0].id).toBe(1)
      expect(bookmarks[0].memberId).toBe(memberId)
      expect(bookmarks[0].isOn).toBe(true)
    })
  })
})
