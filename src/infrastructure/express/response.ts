import { Response } from 'express'
import jsend from 'jsend'

export default class JsendResponse {
  success = (res: Response, status: number) => (data: Object) => {
    if (data) res.status(status || 200).json(jsend.success(data))
    return null
  }

  error = (res: Response, { code, message, data }, status: number = 500) => {
    res.status(status).json(jsend.error({ code, message, data }))
  }

  badRequest = (res: Response, { code, message, data }) => this.error(res, { code, message, data }, 400)

  notFound = (res: Response) => (data: Object) => {
    if (data) return data
    res.status(404).end()
    return null
  }
}
