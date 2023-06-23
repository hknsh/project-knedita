import 'dotenv/config'

import express from 'express'
import router from './routes'
import compression from 'compression'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(compression({ level: 9 }))

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

export default app
