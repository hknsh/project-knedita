import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function userLikeCommentController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id ?? ''
  const { commentId } = req.body

  const result = await user.likeComment(commentId, userId)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default userLikeCommentController
