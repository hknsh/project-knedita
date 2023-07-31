import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function userDeleteController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id ?? ''
  const result = await user.delete(userId)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default userDeleteController
