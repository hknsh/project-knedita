import * as bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from '../../db'

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
const usernameRegex = /^[a-zA-Z0-9_.]{5,15}$/

async function userSignupService (username: string, email: string, password: string): Promise<Object | Error> {
  if (username === undefined || email === undefined || password === undefined) {
    return new Error('Missing fields')
  }

  if (!passwordRegex.test(password)) {
    return new Error('Password must have 8 characters, one number and one special character.')
  }

  if (password.trim().length < 8) {
    return new Error('Password too short')
  }

  if (!usernameRegex.test(username)) {
    return new Error('Username not allowed. Only alphanumerics characters (uppercase and lowercase words), underscore, dots and it must be between 5 and 15 characters')
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
  const hashedPassword = await bcrypt.hash(password.replace(/ /g, ''), salt) // Removes every space in the string

  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
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
