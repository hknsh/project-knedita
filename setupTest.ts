import prisma from './src/clients/prisma-client'
import redis from './src/clients/redis-client'

afterAll(async () => {
  redis.disconnect()
  await prisma.$disconnect()
})
