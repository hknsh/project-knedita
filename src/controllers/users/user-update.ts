import { users } from '../../services'
import { Request, Response } from 'express'

async function userUpdateController (req: Request, res: Response): Promise<void> {
  const result = await users.userUpdate()

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userUpdateController
