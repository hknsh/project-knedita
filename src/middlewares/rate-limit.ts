import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import RedisClient from 'ioredis'

const redisPassword = process.env.REDIS_PASSWORD ?? ''
const redisHost = process.env.REDIS_HOST ?? ''
const redisPort = process.env.REDIS_PORT ?? ''

const client = new RedisClient(`redis://:${redisPassword}@${redisHost}:${redisPort}/0`)

let maxConnections

if (process.env.NODE_ENV === 'development') {
  console.log('Detected Development environment, disabling rate limiter.')
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
    // @ts-expect-error - `call` function is not present in @types/ioredis
    sendCommand: async (...args: string[]) => await client.call(...args)
  })
})

export default limiter
