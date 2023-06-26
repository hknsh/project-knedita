import { Router } from 'express'

// Routers
import usersRouter from './controllers/users-router'
import postsRouter from './controllers/posts-router'

const router = Router()

router.use('/user', usersRouter)
router.use('/post', postsRouter)

export default router
