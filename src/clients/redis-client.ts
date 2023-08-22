import logger from 'helpers/logger'
import { createClient, type RedisClientOptions } from 'redis'

const redisPort = parseInt(process.env.REDIS_PORT ?? '6379', 10)
const redisHost = process.env.REDIS_HOST ?? '127.0.0.1'
const redisPassword = process.env.REDIS_PASSWORD ?? ''

const redisConfig: RedisClientOptions = {
  url: `redis://:${redisPassword}@${redisHost}:${redisPort}/0`,
}

const redis = createClient(redisConfig)

redis
  .connect()
  .then(() => {
    logger.info('Successfully connected to Redis')
  })
  .catch((e: Error) => {
    logger.error(`Error while connecting to Redis: ${e.message}`)
  })

redis.on('error', async (e: Error) => {
  logger.error(`Error in Redis client: ${e.message}`)
})

export default redis
