import post from 'services/posts'
import type { Request, Response } from 'express'
import { badRequest } from 'helpers/http-errors'
import handleResponse from 'helpers/handle-response'

async function postCreateController(
  req: Request,
  res: Response,
): Promise<void> {
  const { content } = req.body
  const id = res.locals.user.id

  if (content === undefined) {
    badRequest(res, 'Expected post content')
    return
  }

  const result = await post.create(content, id)

  handleResponse(res, result)
}

export default postCreateController
