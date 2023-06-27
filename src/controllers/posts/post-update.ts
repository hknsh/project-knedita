import { post } from '../../services/index'
import { Request, Response } from 'express'

async function postUpdateController (req: Request, res: Response): Promise<void> {
  const { postId, content } = req.body
  const userId = req.user?.id ?? ''

  const result = await post.update(postId, content, userId)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default postUpdateController
