import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userFollowController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = res.locals.user.id
  const { userToFollow } = req.body

  const result = await user.follow(userId, userToFollow)

  handleResponse(res, result)
}

export default userFollowController
