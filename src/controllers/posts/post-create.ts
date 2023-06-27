import { post } from '../../services/index'
import { Request, Response } from 'express'

async function postCreateController (req: Request, res: Response): Promise<void> {
  const { content } = req.body
  const id: string = req.user?.id ?? ''

  const result = await post.create(content, id)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default postCreateController
