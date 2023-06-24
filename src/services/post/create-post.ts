import prisma from '../../db'

async function createPostService (content: string, authorId: string): Promise<Object | Error> {
  const user = await prisma.user.findFirst({ where: { id: authorId } })

  if (user === null) {
    return new Error('This user doesn\'t exists')
  }

  const post = await prisma.post.create({
    data: {
      content,
      authorId
    }
  })

  return post
}

export default createPostService
