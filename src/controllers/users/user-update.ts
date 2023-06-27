import { user } from '../../services'
import { Request, Response } from 'express'

async function userUpdateController (req: Request, res: Response): Promise<void> {
  const { email, displayName, username } = req.body
  const id = req.user?.id ?? ''

  const result = await user.update({ id, email, displayName, username })

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userUpdateController
