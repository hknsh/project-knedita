import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'

async function userSearchController(
  req: Request,
  res: Response,
): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    badRequest(res, 'Missing username')
    return
  }

  const result = await user.searchUser(username)

  res.json(result)
}

export default userSearchController
