import prisma from 'clients/prisma-client'

async function userFetchInfoService(
  username: string,
): Promise<Record<string, unknown> | Error> {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      profileImage: true,
      displayName: true,
      username: true,
      createdAt: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      likedPosts: {
        select: {
          postId: true,
        },
      },
    },
  })

  if (user === null) {
    return new Error('User not found')
  }

  return user
}

export default userFetchInfoService
