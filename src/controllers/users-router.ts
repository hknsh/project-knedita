/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'

// Controllers
import userAuthController from './users/auth'
import userDeleteController from './users/delete'
import userFollowController from './users/follow-user'
import userFetchInfoController from './users/fetch-info'
import userFetchPostsController from './users/fetch-posts'
import userLikeCommentController from './users/like-comment'
import userLikePostController from './users/like-post'
import userSearchController from './users/search-user'
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
usersRouter.get('/info', userFetchInfoController)
usersRouter.post('/signup', userSignupController)
usersRouter.put('/update', ensureAuthenticated, userUpdateController)
usersRouter.put('/profile-picture/upload', ensureAuthenticated, uploadFile, userUploadPictureController)
usersRouter.post('/like-post', ensureAuthenticated, userLikePostController)
usersRouter.post('/follow-user', ensureAuthenticated, userFollowController)
usersRouter.get('/fetch-posts', userFetchPostsController)
usersRouter.get('/search', userSearchController)
usersRouter.post('/like-comment', ensureAuthenticated, userLikeCommentController)

export default usersRouter
