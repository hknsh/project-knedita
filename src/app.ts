import 'dotenv/config'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import limiter from 'middlewares/rate-limit'
import morganMiddleware from 'middlewares/morgan'
import router from './routes'

const app = express()

// TODO: test socket io, emit notifications when create one.
// TODO: start to create the client, or a barebone to test socket io

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morganMiddleware)
app.options('*', cors())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT'],
    optionsSuccessStatus: 200,
  }),
)
app.use(limiter)
app.use(router)
app.use(compression({ level: 9 }))

app.use((_req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
  })
})

export default app
