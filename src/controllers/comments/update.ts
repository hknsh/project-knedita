import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function commentUpdateController (
  req: Request,
  res: Response
): Promise<void> {
  const { commentId, content } = req.body
  const id = req.user?.id ?? ''

  if (commentId === undefined) {
    badRequest(res, 'Expected comment content'); return
  }

  if (content === undefined) {
    badRequest(res, 'Expected content to update'); return
  }

  const result = await comment.update(content, id, commentId)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default commentUpdateController
