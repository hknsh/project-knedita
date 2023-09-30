import prisma from 'clients/prisma-client'

async function postFetchInfoService(
  id: string,
): Promise<Record<string, unknown> | Error> {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      likes: true,
      author: {
        select: {
          displayName: true,
          username: true,
          profileImage: true,
        },
      },
    },
  })

  if (post === null) {
    return new Error('Post not found')
  }

  return post
}

export default postFetchInfoService
