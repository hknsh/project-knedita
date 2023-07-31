import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function commentDeleteController (
  req: Request,
  res: Response
): Promise<void> {
  const { commentId } = req.body
  const id = req.user?.id ?? ''

  if (commentId === undefined) {
    badRequest(res, 'Expected comment id'); return
  }

  const result = await comment.delete(commentId, id)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default commentDeleteController
