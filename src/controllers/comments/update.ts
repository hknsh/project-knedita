import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function commentUpdateController (
  req: Request,
  res: Response
): Promise<void> {
  const { commentId, content } = req.body
  const id = res.locals.user.id

  if (commentId === undefined) {
    badRequest(res, 'Expected comment content'); return
  }

  if (content === undefined) {
    badRequest(res, 'Expected content to update'); return
  }

  const result = await comment.update(content, id, commentId)

  handleResponse(res, result)
}

export default commentUpdateController
