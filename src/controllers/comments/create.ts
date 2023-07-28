import comment from '../../services/comments/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function commentCreateController (req: Request, res: Response): Promise<void> {
  const { content, postId } = req.body
  const id = req.user?.id ?? ''

  if (postId === undefined) {
    return badRequest(res, 'Expected post id')
  }

  if (content === undefined) {
    return badRequest(res, 'Expected comment content')
  }

  const result = await comment.create(postId, content, id)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default commentCreateController
