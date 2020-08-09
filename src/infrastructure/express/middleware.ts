import { Request, Response, NextFunction } from 'express'
import { badRequest } from '@infrastructure/express/response'
import GreetingCreateDto from '@controller/dto/GreetingCreateDto'
import GreetingUpdateDto from '@controller/dto/GreetingUpdateDto'

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

    return badRequest(res, { code: 400, message: messages, data: {} })
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

    return badRequest(res, { code: 400, message: messages, data: {} })
  }
}
