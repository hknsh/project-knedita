import prisma from '../../clients/prisma-client'

async function userDeleteService (userId: string): Promise<Object | Error> {
  const user = await prisma.user.findFirst({ where: { id: userId } })

  if (user === null) {
    return new Error('User not found')
  }

  if (user.id !== userId) {
    return new Error('Forbidden')
  }

  await prisma.user.deleteMany({
    where: {
      id: userId
    }
  })

  return {}
}

export default userDeleteService
