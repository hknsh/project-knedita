import comment from '../../services/comments/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function commentFetchController (req: Request, res: Response): Promise<void> {
  const commentId = req.query.id as string

  if (commentId === undefined) {
    return badRequest(res, 'Expected comment id')
  }

  const result = await comment.fetch(commentId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default commentFetchController
