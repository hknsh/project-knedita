import prisma from 'clients/prisma-client'

async function userFollowService(
  userId: string,
  followingUsername: string,
): Promise<Record<string, unknown> | Error> {
  if (userId === undefined || followingUsername === undefined) {
    return new Error('Missing fields')
  }

  const user = await prisma.user.findFirst({
    where: {
      username: followingUsername,
    },
  })

  if (user === null) {
    return new Error('User not found')
  }

  const userToFollow = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (userToFollow === null) {
    return new Error('User to follow not found')
  }

  const alreadyFollow = await prisma.follows.findFirst({
    where: {
      followerId: user.id,
      followingId: userToFollow.id,
    },
  })

  if (alreadyFollow !== null) {
    await prisma.follows.deleteMany({
      where: {
        followerId: user.id,
        followingId: userToFollow.id,
      },
    })
    return {}
  }

  const follow = await prisma.follows.create({
    data: {
      followerId: user.id,
      followingId: userToFollow.id,
    },
  })

  return follow
}

export default userFollowService
