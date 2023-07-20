import { user } from '../../services'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userDeleteController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const result = await user.delete(userId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userDeleteController
