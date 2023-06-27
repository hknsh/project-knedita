import { post } from '../../services/index'
import { Request, Response } from 'express'

async function postDeleteController (req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? ''
  const postId = req.body.postId

  const result = await post.delete(postId, userId)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default postDeleteController
