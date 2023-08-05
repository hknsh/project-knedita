/* eslint-disable */
import * as express from 'express'
import type jwtPayload from '../interfaces/jwt'

declare global {
  namespace Express {
    interface Request {
      user: jwtPayload | undefined
    }
    namespace Multer {
      interface File {
        location: string
        key: string
      }
    }
  }
}
