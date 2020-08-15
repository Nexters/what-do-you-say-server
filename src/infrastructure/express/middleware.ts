import { Request, Response, NextFunction } from 'express'
import { badRequest } from '@infrastructure/express/response'
import GreetingCreateDto from '@controller/dto/GreetingCreateDto'
import GreetingUpdateDto from '@controller/dto/GreetingUpdateDto'
import BookmarkCreateDto from '@controller/dto/BookmarkCreateDto'
import GreetingSearchDto from '@controller/dto/GreetingSearchDto'

export const validGreetingCreateDto = async (req: Request, res: Response, next: NextFunction) => {
  const { situation, honorific, sentenceLength, contents } = req.body

  try {
    const greetingCreateDto: GreetingCreateDto = new GreetingCreateDto()
      .setSituation(situation)
      .setHonorific(honorific)
      .setSentenceLength(sentenceLength)
      .setContents(contents)

    await greetingCreateDto.validate()

    req.body = { greetingCreateDto }

    return next()
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints)

    return badRequest(res, { message: messages })
  }
}

export const validGreetingUpdateDto = async (req: Request, res: Response, next: NextFunction) => {
  const { greetingId, situation, honorific, sentenceLength, contents } = req.body

  try {
    const greetingUpdateDto: GreetingUpdateDto = new GreetingUpdateDto()
      .setGreetingId(greetingId)
      .setSituation(situation)
      .setHonorific(honorific)
      .setSentenceLength(sentenceLength)
      .setContents(contents)

    await greetingUpdateDto.validate()

    req.body = { greetingUpdateDto }

    return next()
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints)

    return badRequest(res, { message: messages })
  }
}

export const validBookmarkCreateDto = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId, greetingId, isOn } = req.body

  try {
    const bookmarkUpdateDto: BookmarkCreateDto = new BookmarkCreateDto()
      .setMemberId(memberId)
      .setGreetingId(greetingId)
      .setIsOn(isOn)

    await bookmarkUpdateDto.validate()

    req.body = { memberId, greetingId, isOn }

    return next()
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints)

    return badRequest(res, { message: messages })
  }
}

export const validGreetingSearchDto = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId, situation, honorific, sentenceLength, start, count } = req.query

  try {
    const greetingSearchDto: GreetingSearchDto = new GreetingSearchDto()
      .setMemberId(parseInt(<string>memberId, 10))
      .setSituation(<string>situation)
      .setHonorific(<string>honorific)
      .setSentenceLength(<string>sentenceLength)
      .setStart(parseInt(<string>start, 10))
      .setCount(parseInt(<string>count, 10))

    await greetingSearchDto.validate()

    req.body = { memberId, greetingSearchDto, start, count }

    return next()
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints)

    return badRequest(res, { message: messages })
  }
}
