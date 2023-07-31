import post from 'services/posts'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function postFetchLikesController (
  req: Request,
  res: Response
): Promise<void> {
  const id = req.query.id as string

  if (id === undefined) {
    badRequest(res, 'Missing post id'); return
  }

  const result = await post.fetchLikes(id)

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default postFetchLikesController
