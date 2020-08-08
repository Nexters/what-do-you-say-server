import { NextFunction, Request, Response } from 'express'
import { before, GET, POST, route } from 'awilix-express'

import { notFound, success } from '@infrastructure/express/response'
import { validGreetingCreateDto } from '@infrastructure/express/middleware'

import GreetingViewDto from '@controller/dto/GreetingViewDto'
import GreetingCreateDto from '@controller/dto/GreetingCreateDto'
import GreetingService from '@service/GreetingService'
import { Greeting } from '@entity/Greeting'

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
   *    responses:
   *      200:
   *        description: 성공
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @GET()
  public async findGreetings(req: Request, res: Response, next: NextFunction) {
    try {
      const findGreetings: Array<Greeting> = await this.greetingService.findGreetings()

      const greetings: Array<GreetingViewDto> = findGreetings.map((greeting: Greeting) => GreetingViewDto.of(greeting))

      return success(res, 200)({ items: greetings })
    } catch (error) {
      return next(error)
    }
  }

  /**
   * @swagger
   * /greetings/1:
   *  get:
   *    summary: 인사말 조회
   *    tags: [Greeting]
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
      const findGreeting: Greeting | undefined = await this.greetingService.findGreeting(greetingId)

      if (!findGreeting) return notFound(res)

      const greeting: GreetingViewDto = GreetingViewDto.of(findGreeting)

      return success(res, 200)({ ...greeting })
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
}
