import { users } from '../../services'
import type { Request, Response } from 'express'

async function userSignupController (req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body

  const result = await users.userSignup(username, email, password)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userSignupController
