import prisma from '../../clients/prisma-client'

async function commentCreateService (postId: string, content: string, authorId: string): Promise<Object | Error> {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  })

  if (post === null) {
    return new Error('Post not found')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: authorId
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  const comment = await prisma.comments.create({
    data: {
      content,
      postId,
      userId: authorId
    }
  })

  return comment
}

export default commentCreateService
