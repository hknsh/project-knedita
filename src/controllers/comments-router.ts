/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Controllers
import comments from './comments'

// Middlewares
import authenticated from '../middlewares/authenticated'

const commentsRouter = Router()

// GET
commentsRouter.get('/fetch-likes', comments.fetchLikes)
commentsRouter.get('/info', comments.fetch)

// POST
commentsRouter.post('/create', authenticated, comments.create)
commentsRouter.post('/delete', authenticated, comments.delete)

// PUT
commentsRouter.put('/update', authenticated, comments.update)

export default commentsRouter
