/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import postCreateController from './posts/create'
import postDeleteController from './posts/delete'
import postInfoController from './posts/get-info'
import postUpdateController from './posts/update'

// Middlewares
import ensureAuthenticated from '../middlewares/ensure-authenticated'

const postsRouter = Router()

// Posts related
postsRouter.post('/create', ensureAuthenticated, postCreateController)
postsRouter.post('/delete', ensureAuthenticated, postDeleteController)
postsRouter.get('/info', postInfoController)
postsRouter.put('/update', ensureAuthenticated, postUpdateController)

export default postsRouter
