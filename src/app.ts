import 'dotenv/config'

import express from 'express'
import router from './routes'
import compression from 'compression'
import limiter from './middlewares/rate-limit'

const app = express()

// TODO: Create a documentation page or create the client because this is getting really big

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
