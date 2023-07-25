import { user } from '../../services'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userFetchPostsController (req: Request, res: Response): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    return badRequest(res, 'Missing username')
  }

  const result = await user.fetchPosts(username)

  res.json(result)
}

export default userFetchPostsController
