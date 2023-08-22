import user from 'services/users'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function userLikePostController(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = res.locals.user.id
  const { postId } = req.body

  const result = await user.likePost(postId, userId)

  handleResponse(res, result)
}

export default userLikePostController
