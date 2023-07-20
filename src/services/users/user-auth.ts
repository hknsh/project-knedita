import * as bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import prisma from '../../clients/prisma-client'

async function userAuthService (email: string, password: string): Promise<Object | Error> {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (user == null) {
    return new Error('User does not exists')
  }

  if (email === undefined || password === undefined) {
    return new Error('Missing fields')
  }

  const validPassword = await bcrypt.compare(password.replace(/ /g, ''), user.password)

  if (!validPassword) {
    return new Error('Invalid email or password')
  }

  const { id } = user

  const bearer = jsonwebtoken.sign({ id }, process.env.JWT_ACCESS_SECRET ?? '', { expiresIn: '1d' })

  return {
    token: bearer
  }
}

export default userAuthService
