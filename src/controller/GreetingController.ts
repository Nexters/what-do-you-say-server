import { NextFunction, Request, Response } from 'express'
import { GET, route } from 'awilix-express'
import { Greeting } from '@entity/Greeting'
import GreetingService from '@service/GreetingService'
import { success } from '@infrastructure/express/response'
import GreetingViewDto from '@controller/dto/GreetingViewDto'

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
}
