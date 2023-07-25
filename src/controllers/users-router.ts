/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import userAuthController from './users/auth'
import userDeleteController from './users/delete'
import userFollowController from './users/follow-user'
import userInfoController from './users/get-info'
import userLikePostController from './users/like-post'
import userSignupController from './users/signup'
import userUpdateController from './users/update'
import userUploadPictureController from './users/upload-picture'

// Middlewares
import ensureAuthenticated from '../middlewares/ensure-authenticated'
import uploadFile from '../middlewares/upload-image'

const usersRouter = Router()

// Users related
usersRouter.post('/auth', userAuthController)
usersRouter.post('/delete', ensureAuthenticated, userDeleteController)
usersRouter.get('/info', userInfoController)
usersRouter.post('/signup', userSignupController)
usersRouter.put('/update', ensureAuthenticated, userUpdateController)
usersRouter.put('/profile-picture/upload', ensureAuthenticated, uploadFile, userUploadPictureController)
usersRouter.post('/like-post', ensureAuthenticated, userLikePostController)
usersRouter.post('/follow-user', ensureAuthenticated, userFollowController)

export default usersRouter
