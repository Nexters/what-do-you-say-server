/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'
import jsend from 'jsend'

export const success = <T>(res: Response<T>, status: number) => (data: T) =>
  res.status(status || 200).json(jsend.success(data) as any)

export const error = (res: Response, { message }, status: number = 500) =>
  res.status(status).json(jsend.error({ message }))

export const badRequest = (res: Response, { message }) => error(res, { message }, 400)

export const notFound = (res: Response, { message }) => error(res, { message }, 404)
