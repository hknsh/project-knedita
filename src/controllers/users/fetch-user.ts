import user from 'services/users'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function userFetchUserController(
  req: Request,
  res: Response,
): Promise<void> {
  const id = res.locals.user.id

  if (id === undefined) {
    badRequest(res, 'Missing id')
    return
  }

  const result = await user.fetchUser(id)

  handleResponse(res, result)
}

export default userFetchUserController
