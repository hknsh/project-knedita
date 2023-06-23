import prisma from '../../../prisma/client'

async function createPostService (content: string, authorId: string) {
  const user = await prisma.user.findFirst({ where: { id: authorId } })

  if (user == null) {
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
