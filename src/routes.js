import { Router } from 'express'

import userSignupController from './controllers/user-signup.js'
import userAuthController from './controllers/user-auth.js'
import userInfoController from './controllers/user-info.js'
import ensureAuthenticated from './middlewares/ensure-authenticated.js'

const router = Router()

router.post('/user/create', userSignupController)
router.post('/user/auth', userAuthController)
router.get('/user/info', ensureAuthenticated, userInfoController)

export default router
