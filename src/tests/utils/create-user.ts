import app from '../../app'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import type userPayload from '../../interfaces/user'

async function signUpNewUser (): Promise<userPayload> {
  // To avoid conflicts with existing usernames or emails
  const username = faker.internet.userName({ lastName: 'doe' }).toLowerCase()
  const email = faker.internet.email()
  const password = faker.internet.password() + '@1'

  await request(app)
    .post('/user/signup')
    .send({
      username,
      email,
      password
    })
    .expect(200)

  const response = await request(app)
    .post('/user/auth')
    .send({
      email,
      password
    })
    .expect(200)

  return {
    username,
    email,
    password,
    token: response.body.token
  }
}

export default signUpNewUser
