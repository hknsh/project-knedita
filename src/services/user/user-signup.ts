import * as bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from '../../../prisma/client'

async function userSignupService (username: string, email: string, password: string): Promise<Object | Error> {
  if (username === undefined || email === undefined || password === undefined) {
    return new Error('Missing fields')
  }

  if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
    return new Error('Username not allowed. Only alphanumerics characters (uppercase and lowercase words), underscore and it must be between 5 and 15 characters')
  }

  if (!validator.isEmail(email)) {
    return new Error('Invalid email format')
  }

  if ((await prisma.user.findFirst({ where: { username } })) != null) {
    return new Error('Username already in use')
  }

  if ((await prisma.user.findFirst({ where: { email } })) != null) {
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
      displayName: true,
      username: true,
      createdAt: true
    }
  })

  return user
}

export default userSignupService
