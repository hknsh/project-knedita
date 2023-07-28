import user from '../../services/users'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userUpdateController (req: Request, res: Response): Promise<void> {
  const { email, displayName, username } = req.body
  const id = req.user?.id ?? ''

  const result = await user.update({ id, email, displayName, username })

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userUpdateController
