import { before, POST, route } from 'awilix-express'
import { Request, Response, NextFunction } from 'express'
import { validBookmarkCreateDto } from '@infrastructure/express/middleware'
import BookmarkService from '@service/BookmarkService'
import { notFound } from '@infrastructure/express/response'

/**
 * @swagger
 * tags:
 *  name: Bookmark
 *  description: 북마크 관련 API
 */
@route('/bookmarks')
export default class BookmarkController {
  private readonly bookmarkService: BookmarkService

  constructor(bookmarkService: BookmarkService) {
    this.bookmarkService = bookmarkService
  }

  /**
   * @swagger
   * /bookmarks:
   *  post:
   *    summary: 북마크 등록 및 취소
   *    tags: [Bookmark]
   *    parameters:
   *      - in: body
   *        name: body
   *        schema:
   *          type: object
   *          properties:
   *            memberId:
   *              type: number
   *              example: 1
   *            greetingId:
   *              type: number
   *              example: 1
   *            isOn:
   *              type: boolean
   *              example: true
   *    responses:
   *      200:
   *        schema:
   *          $ref: '#/definitions/CreatedBookmark'
   *      400:
   *        $ref: '#/components/res/BadRequest'
   *      404:
   *        $ref: '#/components/res/NotFound'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @POST()
  @before(validBookmarkCreateDto)
  public async registerOrCancelBookmark(req: Request, res: Response, next: NextFunction) {
    const { memberId, greetingId, isOn } = req.body

    try {
      const isComplete: boolean = await this.bookmarkService.registerOrCancelBookmark(memberId, greetingId, isOn)

      if (!isComplete) return notFound(res, { message: 'Greeting Entity를 찾을 수 없습니다.' })

      return res.status(200).json({ isComplete })
    } catch (error) {
      return next(error)
    }
  }
}
