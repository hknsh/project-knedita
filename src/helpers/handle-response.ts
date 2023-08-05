import { type Response } from 'express'
import { badRequest } from './http-errors'

export default function handleResponse (res: Response, result: any): void {
  if (result instanceof Error) {
    badRequest(res, result.message)
  } else {
    res.json(result)
  }
}
