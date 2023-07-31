import post from 'services/posts'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function postUpdateController (
  req: Request,
  res: Response
): Promise<void> {
  const { postId, content } = req.body
  const userId = req.user?.id ?? ''

  const result = await post.update(postId, content, userId)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default postUpdateController
