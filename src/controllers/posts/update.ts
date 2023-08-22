import post from 'services/posts'
import type { Request, Response } from 'express'
import handleResponse from 'helpers/handle-response'

async function postUpdateController(
  req: Request,
  res: Response,
): Promise<void> {
  const { postId, content } = req.body
  const userId = res.locals.user.id

  const result = await post.update(postId, content, userId)

  handleResponse(res, result)
}

export default postUpdateController
