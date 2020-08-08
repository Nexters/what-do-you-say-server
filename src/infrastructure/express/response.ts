import { Response } from 'express'
import jsend from 'jsend'

export const success = (res: Response, status: number) => (data: Object) =>
  res.status(status || 200).json(jsend.success(data))

export const error = (res: Response, { code, message, data }, status: number = 500) =>
  res.status(status).json(jsend.error({ code, message, data }))

export const badRequest = (res: Response, { code, message, data }) => this.error(res, { code, message, data }, 400)

export const notFound = (res: Response) => res.status(404).json(jsend.fail({ message: 'Not found Entity' }))
