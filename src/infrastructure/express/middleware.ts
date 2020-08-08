import { Request, Response, NextFunction } from 'express'
import GreetingCreateDto from '@controller/dto/GreetingCreateDto'
import { badRequest } from '@infrastructure/express/response'

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
