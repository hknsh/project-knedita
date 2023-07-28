import comment from '../../services/comments/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function commentUpdateController (req: Request, res: Response): Promise<void> {
  const { commentId, content } = req.body
  const id = req.user?.id ?? ''

  if (commentId === undefined) {
    return badRequest(res, 'Expected comment content')
  }

  if (content === undefined) {
    return badRequest(res, 'Expected content to update')
  }

  const result = await comment.update(content, id, commentId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default commentUpdateController
