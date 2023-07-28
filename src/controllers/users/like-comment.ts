import user from '../../services/users'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userLikeCommentController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const { commentId, postId } = req.body

  const result = await user.likeComment(postId, commentId, userId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userLikeCommentController
