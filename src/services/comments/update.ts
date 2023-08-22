import prisma from 'clients/prisma-client'

async function commentUpdateService(
  content: string,
  authorId: string,
  commentId: string,
): Promise<Record<string, unknown> | Error> {
  const comment = await prisma.comments.findFirst({
    where: {
      id: commentId,
      userId: authorId,
    },
  })

  if (comment === null) {
    return new Error('Comment does not exists')
  }

  const updatedComment = await prisma.comments.update({
    where: {
      id: comment.id,
      userId: authorId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          displayName: true,
          username: true,
          profileImage: true,
        },
      },
    },
  })
  return updatedComment
}

export default commentUpdateService
