import { user } from '../../services'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userLikePostController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const { postId } = req.body

  const result = await user.likePost(postId, userId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userLikePostController
