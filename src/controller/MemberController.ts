import { NextFunction, Request, Response } from 'express'
import { before, GET, POST, route } from 'awilix-express'

import MemberService from '@service/MemberService'
import MemberCreateDto from '@controller/dto/MemberCreateDto'
import { vaildMemberCreateDto } from '@infrastructure/express/middleware'
import { Bookmark } from '@entity/Bookmark'
import BookmarkListViewDto from '@controller/dto/BookmarkListViewDto'

// import GreetingViewDto from '@controller/dto/GreetingViewDto'

/**
 * @swagger
 * tags:
 *  name: Member
 *  description: 로그인 및 SNS 로그인 API
 */
@route('/members')
export default class MemberController {
  private readonly memberService: MemberService

  constructor(memberService: MemberService) {
    this.memberService = memberService
  }

  /**
   * @swagger
   * /Member:
   *  get:
   *    summary: 인사말 리스트 조회
   *    tags: [Member]
   *
   *    responses:
   *      200:
   *        description: 성공
   *      404:
   *        $ref: '#/components/res/NotFound'
   *      500:
   *        $ref: '#/components/res/BadRequest'
   */
  @POST()
  @before(vaildMemberCreateDto)
  public async signUpMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberCreateDto } = req.body
      const memberId: number = await this.memberService.signUpMembers(MemberCreateDto.toEntity(memberCreateDto))

      return res.status(201).json({ memberId })
    } catch (error) {
      return next(error)
    }
  }

  /**
   * @swagger
   * /members/{memberId}/my-page/bookmarks:
   *  get:
   *    summary: 북마크 한 리스트 조회
   *    tags: [Member]
   *    parameters:
   *      - in: path
   *        name: memberId
   *        type: string
   *        description: 사용자 아이디 전달
   *        example: 1
   *      - in: query
   *        name: start
   *        type: string
   *        description: 리스트가 시작되는 인덱스 위치 전달
   *        example: 0
   *      - in: query
   *        name: count
   *        type: string
   *        description: 인사말을 가져올 개수를 전달
   *        example: 10
   *    responses:
   *      200:
   *        schema:
   *          $ref: '#/definitions/Bookmarks'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @GET()
  @route('/:memberId/my-page/bookmarks')
  public async findBookmarksByMyPage(req: Request, res: Response, next: NextFunction) {
    const memberId = parseInt(<string>req.params.memberId, 10)
    const start = parseInt(<string>req.query.start, 10) || 0
    const count = parseInt(<string>req.query.count, 10) || 10

    try {
      const [bookmarks, total]: [Array<Bookmark>, number] = await this.memberService.findBookmarksByMyPage(
        memberId,
        start,
        count,
      )

      // view dto 만들기
      const bookmarkListViewDto: Array<BookmarkListViewDto> = bookmarks.map((boomark: Bookmark) =>
        BookmarkListViewDto.of(boomark),
      )

      return res.status(200).json({ items: bookmarkListViewDto, start, count, total })
    } catch (error) {
      return next(error)
    }
  }
}
