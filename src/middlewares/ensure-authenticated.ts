import { verify } from 'jsonwebtoken'
import prisma from '../db'
import { Response, Request, NextFunction } from 'express'
import jwtPayload from '../interfaces/jwt'

async function ensureAuthenticated (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.headers.authorization === undefined || req.headers.authorization.length === 0) {
    res.status(401).json({
      error: 'Missing token'
    })
    return
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = await new Promise<jwtPayload | undefined>((resolve, reject) => {
      verify(token, process.env.JWT_ACCESS_SECRET ?? '', (error, decoded) => {
        if (error != null) {
          reject(error)
        } else {
          resolve(decoded as jwtPayload)
        }
      })
    })

    if (decoded == null) {
      res.status(401).json({
        error: 'Invalid token'
      })
      return
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id
      }
    })

    if (user == null) {
      res.status(401).json({
        error: 'Invalid user'
      })
      return
    }

    req.user = decoded

    return next()
  } catch (error) {
    res.status(401).json({
      error: (error as Error).message
    })
  }
}

export default ensureAuthenticated
