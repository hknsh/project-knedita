import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function commentCreateController(
  req: Request,
  res: Response,
): Promise<void> {
  const { content, postId } = req.body
  const id = res.locals.user.id

  if (postId === undefined) {
    badRequest(res, 'Expected post id')
    return
  }

  if (content === undefined) {
    badRequest(res, 'Expected comment content')
    return
  }

  const result = await comment.create(postId, content, id)

  handleResponse(res, result)
}

export default commentCreateController
