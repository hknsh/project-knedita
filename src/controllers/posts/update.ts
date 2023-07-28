import post from '../../services/posts/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function postUpdateController (req: Request, res: Response): Promise<void> {
  const { postId, content } = req.body
  const userId = req.user?.id ?? ''

  const result = await post.update(postId, content, userId)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default postUpdateController
