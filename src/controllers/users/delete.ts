import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userDeleteController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = res.locals.user.id
  const result = await user.delete(userId)

  handleResponse(res, result)
}

export default userDeleteController
