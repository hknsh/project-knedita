import prisma from '../../clients/prisma-client'

async function commentDeleteService (commentId: string, authorId: string): Promise<Object | Error> {
  const user = await prisma.user.findFirst({
    where: {
      id: authorId
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  const comment = await prisma.comments.findFirst({
    where: {
      id: commentId,
      userId: user.id
    }
  })

  if (comment === null) {
    return new Error('Comment not found')
  }

  await prisma.comments.deleteMany({
    where: {
      id: comment.id,
      userId: user.id
    }
  })

  return {}
}

export default commentDeleteService
