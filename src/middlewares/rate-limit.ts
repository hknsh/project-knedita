import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redis from 'clients/redis-client'
import logger from 'helpers/logger'

let maxConnections

if (process.env.NODE_ENV === 'development') {
  logger.info('Development environment detected. Rate limit is now disabled.')
  maxConnections = 0
} else {
  maxConnections = 5
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 60 seconds
  max: maxConnections,
  message: { error: 'Too many requests' },
  legacyHeaders: false,

  // Store configuration
  store: new RedisStore({
    sendCommand: async (...args: string[]) => await redis.sendCommand(args)
  })
})

export default limiter
