import * as express from 'express'
import jwtPayload from '../interfaces/jwt'

declare global {
  namespace Express {
    interface Request {
      user: jwtPayload | undefined
    }
  }
}
