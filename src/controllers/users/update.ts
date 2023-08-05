import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userUpdateController (
  req: Request,
  res: Response
): Promise<void> {
  const { email, displayName, username } = req.body
  const id = req.user?.id ?? ''

  const result = await user.update({ id, email, displayName, username })

  handleResponse(res, result)
}

export default userUpdateController
