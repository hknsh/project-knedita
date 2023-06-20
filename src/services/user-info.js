import prisma from '../../prisma/client.js'

async function userInfoService (req) {
  const userId = req.user.id

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true,
      displayName: true,
      username: true,
      createdAt: true
    }
  })

  return user
}

export default userInfoService
