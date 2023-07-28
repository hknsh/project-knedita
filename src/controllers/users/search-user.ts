import user from '../../services/users'
import { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userSearchController (req: Request, res: Response): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    return badRequest(res, 'Missing username')
  }

  const result = await user.searchUser(username)

  res.json(result)
}

export default userSearchController
