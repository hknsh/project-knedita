import userPayload from '../../interfaces/user'
import prisma from '../../clients/prisma-client'

async function userUpdateService ({ id, email, displayName, username }: userPayload): Promise<Object | Error> {
  const user = await prisma.user.findFirst({ where: { id } })

  if (user === null) {
    return new Error('User not found')
  }

  if (email !== undefined && email.trim() !== user.email) {
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if ((existingUser != null) && existingUser.email !== user.email) {
      return new Error('Email already in use')
    }
  }

  if (username !== undefined && username.trim() !== user.username) {
    const existingUser = await prisma.user.findFirst({ where: { username } })
    if ((existingUser != null) && existingUser.username !== user.username) {
      return new Error('Username already in use')
    }
  }

  if (user.id !== id) {
    return new Error('Forbidden')
  }

  // TODO: /user/change-password | /user/change-email

  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      email: email ?? user.email,
      displayName: displayName ?? user.displayName,
      username: username ?? user.username
    },
    select: {
      displayName: true,
      username: true,
      createdAt: true
    }
  })

  return updatedUser
}

export default userUpdateService
