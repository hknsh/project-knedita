/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Controllers
import user from './users'

// Middlewares
import authenticated from '../middlewares/authenticated'
import uploadFile from '../middlewares/upload-image'

const usersRouter = Router()

// GET
usersRouter.get('/fetch-posts', user.fetchPosts)
usersRouter.get('/info', user.fetchInfo)
usersRouter.get('/search', user.searchUser)

// POST
usersRouter.post('/auth', user.auth)
usersRouter.post('/delete', authenticated, user.delete)
usersRouter.post('/follow-user', authenticated, user.follow)
usersRouter.post('/like-comment', authenticated, user.likeComment)
usersRouter.post('/like-post', authenticated, user.likePost)
usersRouter.post('/signup', user.signup)

// PUT
usersRouter.put('/profile-picture/upload', authenticated, uploadFile, user.uploadPicture)
usersRouter.put('/update', authenticated, user.update)

export default usersRouter
