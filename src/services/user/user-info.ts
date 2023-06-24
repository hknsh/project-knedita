import prisma from '../../db'

async function userInfoService (id: string): Promise<Object> {
  const user = await prisma.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      displayName: true,
      username: true,
      createdAt: true
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  return user
}

export default userInfoService
