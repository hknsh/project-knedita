import prisma from '../../clients/prisma-client'

async function postFetchInfoService (id: string): Promise<Object | Error> {
  const post = await prisma.post.findFirst({
    where: {
      id
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
          username: true
        }
      }
    }
  })

  if (post === null) {
    return new Error('Post not found')
  }

  return post
}

export default postFetchInfoService
