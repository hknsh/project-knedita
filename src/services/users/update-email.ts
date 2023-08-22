import type User from 'interfaces/user'
import prisma from 'clients/prisma-client'

async function userUpdateEmailService ({
  id,
  email
}: User): Promise<Record<string, unknown> | Error> {
  const user = await prisma.user.findFirst({ where: { id } })

  if (user === null) {
    return new Error('User not found')
  }

  if (user.id !== id) {
    return new Error('Forbidden')
  }

  if (email !== undefined && email.trim() !== user.email) {
    const existingUser = await prisma.user.findFirst({ where: { email } })
    if (existingUser != null && existingUser.email !== user.email) {
      return new Error('Email already in use')
    }
  }

  await prisma.user.update({
    where: {
      id
    },
    data: {
      email: email ?? user.email
    },
    select: {
      displayName: true,
      username: true,
      createdAt: true
    }
  })

  return { message: 'Successfully updated user email' }
}

export default userUpdateEmailService
