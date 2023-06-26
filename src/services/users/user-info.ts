import prisma from '../../db'

async function userInfoService (username: string): Promise<Object> {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    select: {
      displayName: true,
      username: true,
      createdAt: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  return user
}

export default userInfoService
