import { Router } from 'express'

// Routers
import usersRouter from './controllers/users-router'
import postsRouter from './controllers/posts-router'
import commentsRouter from './controllers/comments-router'

const router = Router()

router.use('/user', usersRouter)
router.use('/post', postsRouter)
router.use('/comment', commentsRouter)

export default router
