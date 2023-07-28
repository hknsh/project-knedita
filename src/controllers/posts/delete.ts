import post from '../../services/posts'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function postDeleteController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const postId = req.body.postId

  const result = await post.delete(postId, userId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default postDeleteController
