import RedisClient from 'ioredis'

const redisPassword = process.env.REDIS_PASSWORD ?? ''
const redisHost = process.env.REDIS_HOST ?? ''
const redisPort = process.env.REDIS_PORT ?? ''

const redis = new RedisClient(
  `redis://:${redisPassword}@${redisHost}:${redisPort}/0`
)

export default redis
