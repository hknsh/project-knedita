import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function commentFetchController (
  req: Request,
  res: Response
): Promise<void> {
  const commentId = req.query.id as string

  if (commentId === undefined) {
    badRequest(res, 'Expected comment id'); return
  }

  const result = await comment.fetch(commentId)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default commentFetchController
