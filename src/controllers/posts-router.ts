/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import postCreateController from './posts/create'
import postDeleteController from './posts/delete'
import postFetchInfoController from './posts/fetch-info'
import postUpdateController from './posts/update'

// Middlewares
import ensureAuthenticated from '../middlewares/ensure-authenticated'
import postFetchLikesController from './posts/fetch-likes'

const postsRouter = Router()

// Posts related
postsRouter.post('/create', ensureAuthenticated, postCreateController)
postsRouter.post('/delete', ensureAuthenticated, postDeleteController)
postsRouter.get('/info', postFetchInfoController)
postsRouter.put('/update', ensureAuthenticated, postUpdateController)
postsRouter.get('/fetch-likes', postFetchLikesController)

export default postsRouter
