import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  await prisma.user.deleteMany({
    where: {
      username: 'cookie_'
    }
  })

  console.log('Seeding database...')

  await prisma.user.create({
    data: {
      displayName: 'Cookie_',
      username: 'cookie_',
      email: 'cookie@cookie.com',
      password: '$2a$10$vBx5LkpZNMC3j1bHopUcp.ZcsMt5xfWlUJJGYIb4511aNccnHmMqi' // cookie
    }
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
