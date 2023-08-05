import { verify } from 'jsonwebtoken'
import prisma from 'clients/prisma-client'
import type { Response, Request, NextFunction } from 'express'
import type jwtPayload from 'interfaces/jwt'
import { unauthorized } from 'helpers/http-errors'

async function authenticated (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.length === 0
  ) {
    unauthorized(res, 'Missing token'); return
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = await new Promise<jwtPayload | undefined>(
      (resolve, reject) => {
        verify(token, process.env.JWT_ACCESS_SECRET ?? '', (error, decoded) => {
          if (error != null) {
            reject(error)
          } else {
            resolve(decoded as jwtPayload)
          }
        })
      }
    )

    if (decoded == null) {
      unauthorized(res, 'Invalid token'); return
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id
      }
    })

    if (user == null) {
      unauthorized(res, 'User does not exists'); return
    }

    req.user = decoded

    next()
  } catch (error) {
    unauthorized(res, `JWT Error: ${(error as Error).message}`)
  }
}

export default authenticated
