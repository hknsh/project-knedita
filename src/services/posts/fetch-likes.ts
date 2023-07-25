import prisma from '../../clients/prisma-client'

async function postFetchLikesService (id: string): Promise<Object | Error> {
  const post = await prisma.like.findMany({
    where: {
      postId: id
    },
    select: {
      user: {
        select: {
          displayName: true,
          username: true,
          profileImage: true
        }
      }
    }
  })

  if (post === null) {
    return new Error('Post not found')
  }

  return post
}

export default postFetchLikesService
