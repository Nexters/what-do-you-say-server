import { NextFunction, Request, Response } from 'express'
import { before, POST, route } from 'awilix-express'

import MemberService from '@service/MemeberService'
import MemberCreateDto from '@controller/dto/MemberCreateDto'
import { vaildMemberCreateDto } from '@infrastructure/express/middleware'

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
}
