import prisma from '../../db'

async function postDeleteService (postId: string, userId: string): Promise<Object | Error> {
  const post = await prisma.post.findFirst({ where: { id: postId } })

  if (post === null) {
    return new Error('Post not found')
  }

  if (await prisma.user.findFirst({ where: { id: userId } }) === null) {
    return new Error('User not found')
  }

  if (post.authorId !== userId) {
    return new Error('Forbidden')
  }

  await prisma.post.deleteMany({
    where: {
      id: postId
    }
  })

  return {}
}

export default postDeleteService
