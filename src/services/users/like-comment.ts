import prisma from 'clients/prisma-client'

async function userLikeCommentService (
  commentId: string,
  userId: string
): Promise<Record<string, unknown> | Error> {
  if (commentId === undefined || userId === undefined) {
    return new Error('Missing fields')
  }

  const comment = await prisma.comments.findFirst({
    where: {
      id: commentId
    }
  })

  if (comment === null) {
    return new Error('Comment not found')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  const alreadyLiked = await prisma.commentLike.findFirst({
    where: {
      commentId: comment.id,
      userId: user.id
    }
  })

  if (alreadyLiked !== null) {
    await prisma.commentLike.deleteMany({
      where: {
        commentId: comment.id,
        userId: user.id
      }
    })
    return {}
  }

  const like = await prisma.commentLike.create({
    data: {
      commentId: comment.id,
      userId: user.id
    }
  })

  return like
}

export default userLikeCommentService
