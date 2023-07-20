import prisma from '../../clients/prisma-client'

async function userUploadPictureService (authorId: string, url: string): Promise<Object | Error> {
  const user = await prisma.user.findFirst({ where: { id: authorId } })

  if (user == null) {
    return new Error('User does not exists')
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: authorId
    },
    data: {
      profileImage: url
    },
    select: {
      profileImage: true,
      displayName: true,
      username: true,
      createdAt: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  })

  return updatedUser
}

export default userUploadPictureService
