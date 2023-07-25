import prisma from '../../clients/prisma-client'

async function userLikePostService (postId: string, userId: string): Promise<Object | Error> {
  if (postId === undefined || userId === undefined) {
    return new Error('Missing fields')
  }

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
      id: userId
    }
  })

  if (user === null) {
    return new Error('User not found')
  }

  const alreadyLiked = await prisma.like.findFirst({
    where: {
      postId: post.id,
      userId: user.id
    }
  })

  if (alreadyLiked !== null) {
    await prisma.like.deleteMany({
      where: {
        postId: post.id,
        userId: user.id
      }
    })
    return {}
  }

  const like = await prisma.like.create({
    data: {
      postId: post.id,
      userId: user.id
    }
  })

  return like
}

export default userLikePostService
