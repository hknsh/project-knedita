import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function userFetchPostsController (
  req: Request,
  res: Response
): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    badRequest(res, 'Missing username'); return
  }

  const result = await user.fetchPosts(username)

  handleResponse(res, result)
}

export default userFetchPostsController
