import user from '../../services/users'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userSignupController (req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body

  const result = await user.signup(username, email, password)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userSignupController
