import { posts } from '../../services/index'
import { Request, Response } from 'express'

async function postUpdateController (req: Request, res: Response): Promise<void> {
  const result = await posts.postUpdate()

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default postUpdateController
