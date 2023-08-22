import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'

async function userAuthController(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  const result = await user.auth({ email, password })

  if (result instanceof Error) {
    badRequest(res, result.message)
  } else {
    res
      .cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ message: 'Logged in successfully' })
  }
}

export default userAuthController
