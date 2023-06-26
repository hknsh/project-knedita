import { users } from '../../services'
import type { Request, Response } from 'express'

async function userInfoController (req: Request, res: Response): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    res.status(400).json({
      error: 'Missing username'
    })
    return
  }

  const result = await users.userInfo(username.toLowerCase())

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userInfoController
