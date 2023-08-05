import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userLikeCommentController (
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id ?? ''
  const { commentId } = req.body

  const result = await user.likeComment(commentId, userId)

  handleResponse(res, result)
}

export default userLikeCommentController
