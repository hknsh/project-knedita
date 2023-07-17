import 'dotenv/config'

import express from 'express'
import router from './routes'
import compression from 'compression'
import limiter from './middlewares/rate-limit'

const app = express()

// TODO: Disable image resize when it's a post attachment
// TODO: Add user-upload-picture tests
// TODO: Apply http-errors lib on the controllers
// TODO: Automatically apply the newest migration when starting up the docker
// TODO: Refactor some parts of the code

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(limiter)
app.use(compression({ level: 9 }))

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

export default app
