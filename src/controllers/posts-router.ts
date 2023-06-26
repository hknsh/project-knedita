/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import postCreateController from './posts/post-create'
import postDeleteController from './posts/post-delete'
import postInfoController from './posts/post-info'
import postUpdateController from './posts/post-update'

// Middlewares
import ensureAuthenticated from '../middlewares/ensure-authenticated'

const postsRouter = Router()

// Posts related
postsRouter.post('/create', ensureAuthenticated, postCreateController)
postsRouter.post('/delete', ensureAuthenticated, postDeleteController)
postsRouter.get('/info', postInfoController)
postsRouter.put('/update', postUpdateController)

export default postsRouter
