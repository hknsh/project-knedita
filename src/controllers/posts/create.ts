import post from 'services/posts'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function postCreateController (
  req: Request,
  res: Response
): Promise<void> {
  const { content } = req.body
  const id: string = req.user?.id ?? ''

  if (content === undefined) {
    badRequest(res, 'Expected post content'); return
  }

  const result = await post.create(content, id)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default postCreateController
