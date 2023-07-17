import { Response } from 'express'

const sendErrorResponse = (res: Response, status: number, message: string): void => {
  res.status(status).json({ error: message })
}

export const badRequest = (res: Response, message = 'Bad Request'): void => {
  sendErrorResponse(res, 400, message)
}

export const unauthorized = (res: Response, message = 'Unauthorized'): void => {
  sendErrorResponse(res, 401, message)
}

export const forbidden = (res: Response, message = 'Forbidden'): void => {
  sendErrorResponse(res, 403, message)
}

export const internalServerError = (res: Response, message = 'Internal Server Error'): void => {
  sendErrorResponse(res, 500, message)
}
