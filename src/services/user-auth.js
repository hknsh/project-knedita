import * as bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import prisma from '../../prisma/client.js'

async function userAuthService ({ email, password }) {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (!user) {
    return new Error('User does not exists')
  }

  if (email === undefined || password === undefined) {
    return new Error('Missing fields')
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (validPassword === false) {
    return new Error('Invalid email or password')
  }

  const { id } = user

  const bearer = jsonwebtoken.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })

  return {
    token: bearer
  }
}

export default userAuthService
