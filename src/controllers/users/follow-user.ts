import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function userFollowController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id ?? ''
  const { userToFollow } = req.body

  const result = await user.follow(userId, userToFollow)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default userFollowController
