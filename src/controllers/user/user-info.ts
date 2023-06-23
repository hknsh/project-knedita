import userInfoService from '../../services/user/user-info'
import type { Request, Response } from 'express'

async function userInfoController (req: Request, res: Response): Promise<void> {
  const id = req.user?.id ?? ''

  const result = await userInfoService(id)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default userInfoController
