import { NextFunction, Request, Response } from 'express'
import { before, GET, PATCH, POST, route } from 'awilix-express'

import { notFound, success } from '@infrastructure/express/response'
import { validGreetingCreateDto, validGreetingUpdateDto } from '@infrastructure/express/middleware'

import { Greeting } from '@entity/Greeting'
import { GreetingListView } from '@common/types/greeting-list-view'
import GreetingService from '@service/GreetingService'
import GreetingViewDto from '@controller/dto/GreetingViewDto'
import GreetingCreateDto from '@controller/dto/GreetingCreateDto'
import GreetingUpdateDto from '@controller/dto/GreetingUpdateDto'
import GreetingListViewDto from '@controller/dto/GreetingListViewDto'

/**
 * @swagger
 * tags:
 *  name: Greeting
 *  description: 인사말 관련 API
 */
@route('/greetings')
export default class GreetingController {
  private readonly greetingService: GreetingService

  constructor(greetingService: GreetingService) {
    this.greetingService = greetingService
  }

  /**
   * @swagger
   * /greetings:
   *  get:
   *    summary: 인사말 리스트 조회
   *    tags: [Greeting]
   *    parameters:
   *      - in: query
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
   *        description: 성공
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @GET()
  public async findGreetings(req: Request, res: Response, next: NextFunction) {
    const memberId: number = parseInt(<string>req.query.memberId, 10)
    const start: number = parseInt(<string>req.query.start, 10) || 0
    const count: number = parseInt(<string>req.query.count, 10) || 10

    try {
      const [greetings, total]: [Array<GreetingListView>, number] = await this.greetingService.findGreetings(
        memberId,
        start,
        count,
      )

      const greetingsViewDtos: Array<GreetingListViewDto> = greetings.map((greeting: GreetingListView) =>
        GreetingListViewDto.of(greeting),
      )

      return success(res, 200)({ items: greetingsViewDtos, start, count, total })
    } catch (error) {
      return next(error)
    }
  }

  /**
   * @swagger
   * /greetings/{id}:
   *  get:
   *    summary: 인사말 조회
   *    tags: [Greeting]
   *    parameters:
   *      - in: path
   *        name: id
   *        type: string
   *        example: 1
   *    responses:
   *      200:
   *        description: 성공
   *      404:
   *        $ref: '#/components/res/NotFound'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @GET()
  @route('/:id')
  public async findGreeting(req: Request, res: Response, next: NextFunction) {
    const greetingId = parseInt(req.params.id, 10)

    try {
      const greeting: Greeting | undefined = await this.greetingService.findGreeting(greetingId)

      if (!greeting) return notFound(res)

      const greetingViewDto: GreetingViewDto = GreetingViewDto.of(greeting)

      return success(res, 200)({ ...greetingViewDto })
    } catch (error) {
      return next(error)
    }
  }

  /**
   * @swagger
   * /greetings:
   *  post:
   *    summary: 인사말 등록
   *    tags: [Greeting]
   *    parameters:
   *      - in: body
   *        name: body
   *        schema:
   *          type: obejct
   *          properties:
   *            situation:
   *              type: string
   *              example: 생일
   *            honorific:
   *              type: string
   *              example: 반말
   *            sentenceLength:
   *              type: string
   *              example: 1줄
   *            contents:
   *              type: string
   *              example: 생일 축하해!
   *    responses:
   *      201:
   *        description: 인사말 등록 성공
   *      400:
   *        $ref: '#/components/res/BadRequest'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @POST()
  @before(validGreetingCreateDto)
  public async createGreeting(req: Request, res: Response, next: NextFunction) {
    const { greetingCreateDto } = req.body

    try {
      const createdGreetingId: number = await this.greetingService.createGreeting(
        GreetingCreateDto.toEntity(greetingCreateDto),
      )

      return success(res, 201)({ createdGreetingId })
    } catch (error) {
      return next(error)
    }
  }

  /**
   * @swagger
   * /greetings:
   *  patch:
   *    summary: 인사말 수정
   *    tags: [Greeting]
   *    parameters:
   *      - in: body
   *        name: body
   *        schema:
   *          type: obejct
   *          properties:
   *            greetingId:
   *              type: number
   *              example: 1
   *            situation:
   *              type: string
   *              example: 생일
   *            honorific:
   *              type: string
   *              example: 반말
   *            sentenceLength:
   *              type: string
   *              example: 1줄
   *            contents:
   *              type: string
   *              example: 생일 축하해!
   *    responses:
   *      200:
   *        description: 인사말 수정 성공
   *      400:
   *        $ref: '#/components/res/BadRequest'
   *      404:
   *        $ref: '#/components/res/NotFound'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @PATCH()
  @before(validGreetingUpdateDto)
  public async updateGreeting(req: Request, res: Response, next: NextFunction) {
    const { greetingUpdateDto } = req.body

    try {
      const updatedGreeting: Greeting | undefined = (await this.greetingService.updateGreeing(
        GreetingUpdateDto.toEntity(greetingUpdateDto),
      )) as Greeting

      if (!updatedGreeting) return notFound(res)

      const greetingViewDto: GreetingViewDto = GreetingViewDto.of(updatedGreeting)

      return success(res, 200)({ ...greetingViewDto })
    } catch (error) {
      return next(error)
    }
  }
}
