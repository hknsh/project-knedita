import { posts } from '../../services/index'
import { Request, Response } from 'express'

async function postInfoController (req: Request, res: Response): Promise<void> {
  const id = req.query.id as string

  if (id === undefined) {
    res.status(400).json({
      error: 'Missing username'
    })
    return
  }

  const result = await posts.postInfo(id)

  if (result instanceof Error) {
    res.status(400).json({
      error: result.message
    })
    return
  }

  res.json(result)
}

export default postInfoController
