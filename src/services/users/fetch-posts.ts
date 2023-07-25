import prisma from '../../clients/prisma-client'

async function userFetchPostsService (username: string): Promise<Object | Error> {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        username
      }
    },
    select: {
      _count: true,
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return posts
}

export default userFetchPostsService
