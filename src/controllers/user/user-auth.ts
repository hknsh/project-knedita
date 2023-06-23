import userAuthService from '../../services/user/user-auth'
import type { Request, Response } from 'express'

async function userAuthController (req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  const result = await userAuthService(email, password)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userAuthController
