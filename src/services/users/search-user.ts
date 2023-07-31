import prisma from 'clients/prisma-client'

async function userSearchService (username: string): Promise<unknown | Error> {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username
      }
    },
    select: {
      displayName: true,
      username: true,
      profileImage: true
    },
    take: 10
  })
  return users
}

export default userSearchService
