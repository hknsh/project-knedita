import 'dotenv/config'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import limiter from 'middlewares/rate-limit'
import morganMiddleware from 'middlewares/morgan'
import router from './routes'
import cookieParser from 'cookie-parser'

const app = express()

// TODO: test socket io, emit notifications when create one.
// TODO: test update name, email and password routes.
// TODO: start to create the client, or a barebone to test socket io
// TODO: see how we create authentication with socket io.

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morganMiddleware)
app.use(limiter)
app.use(router)
app.use(compression({ level: 9 }))
app.use(cors({
  credentials: true,
  origin: '*', // TODO: Add client development (and production too) url
  optionsSuccessStatus: 200
}))

app.use((_req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  })
})

export default app
