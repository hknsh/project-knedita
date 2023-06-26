import { users } from '../../services'
import { Request, Response } from 'express'

async function userDeleteController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const result = await users.userDelete(userId)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userDeleteController
