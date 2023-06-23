import { Router } from 'express'

// Controllers
import userSignupController from './controllers/user/user-signup'
import userAuthController from './controllers/user/user-auth'
import userInfoController from './controllers/user/user-info'
import createPostController from './controllers/post/create-post'

// Middlewares
import ensureAuthenticated from './middlewares/ensure-authenticated'

const router = Router()

// User related
router.post('/user/auth', userAuthController)
router.post('/user/create', userSignupController)
router.get('/user/info', ensureAuthenticated, userInfoController)

// Post related
router.post('/post/create', ensureAuthenticated, createPostController)

export default router
