import { post } from '../../services/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function postFetchInfoController (req: Request, res: Response): Promise<void> {
  const id = req.query.id as string

  if (id === undefined) {
    return badRequest(res, 'Missing post id')
  }

  const result = await post.info(id)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default postFetchInfoController
