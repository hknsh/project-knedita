import post from 'services/posts'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function postDeleteController(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = res.locals.user.id
  const postId = req.body.postId

  if (postId === undefined) {
    badRequest(res, 'Missing post id')
    return
  }

  const result = await post.delete(postId, userId)

  handleResponse(res, result)
}

export default postDeleteController
