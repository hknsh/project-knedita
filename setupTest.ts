import prisma from './src/clients/prisma-client'
import redis from './src/clients/redis-client'

process.env.NODE_ENV = 'development'

afterAll(async () => {
  await redis.disconnect()
  await prisma.$disconnect()
})
