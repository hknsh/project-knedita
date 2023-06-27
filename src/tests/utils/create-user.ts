import app from '../../app'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import userPayload from '../../interfaces/user'

async function signUpNewUser (): Promise<userPayload> {
  // To avoid conflicts with existing usernames or emails
  const username = faker.internet.userName().toLowerCase()
  const email = faker.internet.email().toLowerCase()
  const password = faker.internet.password()

  await request(app).post('/user/signup').send({
    username,
    email,
    password
  })

  const response = await request(app)
    .post('/user/auth')
    .send({
      email,
      password
    })

  return {
    username,
    email,
    password,
    token: response.body.token
  }
}

export default signUpNewUser
