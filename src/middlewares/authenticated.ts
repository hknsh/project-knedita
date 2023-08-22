import { verify } from 'jsonwebtoken'
import prisma from 'clients/prisma-client'
import type { Response, Request, NextFunction } from 'express'
import { unauthorized } from 'helpers/http-errors'
import type jwtPayload from 'interfaces/jwt'

async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies.token

    if (token === undefined) {
      unauthorized(res, 'Missing token')
      return
    }

    const { id } = verify(
      token,
      process.env.JWT_ACCESS_SECRET ?? '',
    ) as jwtPayload

    if (id === undefined) {
      unauthorized(res, 'Invalid token')
      return
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (user === undefined) {
      unauthorized(res, 'User does not exists')
      return
    }

    res.locals.user = user
    next()
  } catch (e) {
    unauthorized(res, `JWT Error: ${(e as Error).message}`)
  }
}

export default authenticated
