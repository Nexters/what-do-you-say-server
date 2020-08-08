import { NextFunction, Request, Response } from 'express'
import { GET, route } from 'awilix-express'
import { notFound, success } from '@infrastructure/express/response'
import GreetingViewDto from '@controller/dto/GreetingViewDto'
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
   *      404:
   *        $ref: '#/components/res/NotFound'
   *      500:
   *        $ref: '#/components/res/BadRequest'
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
   *        $ref: '#/components/res/BadRequest'
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
}
