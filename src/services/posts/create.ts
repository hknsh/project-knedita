import prisma from '../../clients/prisma-client'

async function postCreateService (content: string, authorId: string): Promise<Object | Error> {
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

export default postCreateService
