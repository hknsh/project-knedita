import * as bcrypt from 'bcrypt'
import prisma from '../../prisma/client.js'

async function userSignupService ({ username, email, password }) {
  if (!username || !email || !password) {
    return new Error('Missing fields')
  }

  if (/^[a-zA-Z0-9_]{5,15}$/.test(username) === false) {
    return new Error('Username not allowed. Only alphanumerics characters (uppercase and lowercase words), underscore and it must be between 5 and 15 characters')
  }

  if (await prisma.user.findFirst({ where: { username } })) {
    return new Error('Username already in use')
  }

  if (await prisma.user.findFirst({ where: { email } })) {
    return new Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      createdAt: true
    }
  })

  return user
}

export default userSignupService
