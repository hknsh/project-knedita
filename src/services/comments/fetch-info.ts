import prisma from 'clients/prisma-client'

async function commentFetchService (commentId: string): Promise<Record<string, unknown> | Error> {
  const comment = await prisma.comments.findFirst({
    where: {
      id: commentId
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          displayName: true,
          username: true,
          profileImage: true
        }
      }
    }
  })

  if (comment === null) {
    return new Error('Comment not found')
  }

  return comment
}

export default commentFetchService
