/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import commentCreateController from './comments/create'
import commentDeleteController from './comments/delete'
import commentFetchController from './comments/fetch-info'
import commentFetchLikesController from './comments/fetch-likes'
import commentUpdateController from './comments/update'

// Middlewares
import ensureAuthenticated from '../middlewares/ensure-authenticated'

const commentsRouter = Router()

// Posts related
commentsRouter.post('/create', ensureAuthenticated, commentCreateController)
commentsRouter.post('/delete', ensureAuthenticated, commentDeleteController)
commentsRouter.get('/info', commentFetchController)
commentsRouter.put('/update', ensureAuthenticated, commentUpdateController)
commentsRouter.get('/fetch-likes', commentFetchLikesController)

export default commentsRouter
