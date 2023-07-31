import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'lib/http-errors'

async function userFetchInfoController (
  req: Request,
  res: Response
): Promise<void> {
  const username = req.query.u as string

  if (username === undefined) {
    badRequest(res, 'Missing username'); return
  }

  const result = await user.fetchInfo(username.toLowerCase())

  if (result instanceof Error) {
    badRequest(res, result.message); return
  }

  res.json(result)
}

export default userFetchInfoController
