import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userUpdatePasswordController (
  req: Request,
  res: Response
): Promise<void> {
  const { currentPassword, newPassword } = req.body
  const id = res.locals.user.id

  const result = await user.updatePassword(id, currentPassword, newPassword)

  handleResponse(res, result)
}

export default userUpdatePasswordController
