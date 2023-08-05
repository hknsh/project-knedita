import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function commentFetchController (
  req: Request,
  res: Response
): Promise<void> {
  const commentId = req.query.id as string

  if (commentId === undefined) {
    badRequest(res, 'Expected comment id'); return
  }

  const result = await comment.fetch(commentId)

  handleResponse(res, result)
}

export default commentFetchController
