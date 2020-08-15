import { GET, route } from 'awilix-express'
import { Request, Response, NextFunction } from 'express'
import { Category } from '@entity/Category'
import CommonCategoryRepository from '@repository/CommonCategoryRepository'
import CategoryViewDto from '@controller/dto/CategoryViewDto'

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: 카테고리 관련 API
 */
@route('/categories')
export default class CategoryController {
  private readonly categoryRepository: CommonCategoryRepository

  constructor(categoryRepository: CommonCategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  /**
   * @swagger
   * /categories:
   *  get:
   *    summary: 카테고리 리스트 조회
   *    tags: [Category]
   *    responses:
   *      200:
   *        schema:
   *          $ref: '#/definitions/Categories'
   *      500:
   *        $ref: '#/components/res/InternalServerError'
   */
  @GET()
  public async findCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const [findCategories, total]: [Array<Category>, number] = await this.categoryRepository.findAll({
        where: { isDisplay: true },
      })

      const categories: Array<CategoryViewDto> = findCategories.map((category: Category) =>
        CategoryViewDto.of(category),
      )

      return res.status(200).json({ items: categories, total })
    } catch (error) {
      return next(error)
    }
  }
}
