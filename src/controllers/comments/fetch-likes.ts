import comment from '../../services/comments'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function commentFetchLikesController (req: Request, res: Response): Promise<void> {
  const commentId = req.query.id as string

  if (commentId === undefined) {
    return badRequest(res, 'Expected comment id')
  }

  const result = await comment.fetchLikes(commentId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default commentFetchLikesController
