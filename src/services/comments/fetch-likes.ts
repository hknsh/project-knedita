import prisma from 'clients/prisma-client'

async function commentFetchLikesService(id: string): Promise<unknown | Error> {
  const post = await prisma.commentLike.findMany({
    where: {
      commentId: id,
    },
    select: {
      user: {
        select: {
          displayName: true,
          username: true,
          profileImage: true,
        },
      },
    },
  })

  if (post === null) {
    return new Error('Comment not found')
  }

  return post
}

export default commentFetchLikesService
