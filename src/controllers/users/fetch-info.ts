import { user } from '../../services'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function userFetchInfoController (req: Request, res: Response): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    return badRequest(res, 'Missing username')
  }

  const result = await user.fetchInfo(username.toLowerCase())

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default userFetchInfoController
