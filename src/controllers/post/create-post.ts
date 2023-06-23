import createPostService from '../../services/post/create-post'
import { Request, Response } from 'express'

async function createPostController (req: Request, res: Response): Promise<void> {
  const { content } = req.body
  const id: string = req.user?.id ?? ''

  const result = await createPostService(content, id)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default createPostController
