import userSignupService from '../../services/user/user-signup'
import type { Request, Response } from 'express'

async function userSignupController (req: Request, res: Response): Promise<void> {
  const { username, email, password } = req.body

  const result = await userSignupService(username, email, password)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userSignupController
