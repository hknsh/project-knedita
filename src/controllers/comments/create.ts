import comment from 'services/comments'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function commentCreateController (
  req: Request,
  res: Response
): Promise<void> {
  const { content, postId } = req.body
  const id = req.user?.id ?? ''

  if (postId === undefined) {
    badRequest(res, 'Expected post id'); return
  }

  if (content === undefined) {
    badRequest(res, 'Expected comment content'); return
  }

  const result = await comment.create(postId, content, id)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default commentCreateController
