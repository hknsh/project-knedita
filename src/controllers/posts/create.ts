import { post } from '../../services/index'
import type { Request, Response } from 'express'
import { badRequest } from '../../lib/http-errors'

async function postCreateController (req: Request, res: Response): Promise<void> {
  const { content } = req.body
  const id: string = req.user?.id ?? ''

  const result = await post.create(content, id)

  if (result instanceof Error) {
    return badRequest(res, result.message)
  }

  res.json(result)
}

export default postCreateController
