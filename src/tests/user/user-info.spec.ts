import app from '../../app'
import request from 'supertest'
import deleteUser from '../utils/delete-user'
import signUpNewUser from '../utils/create-user'
import type User from '../../interfaces/user'

let user: User

describe('POST /user/info', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  afterAll(async () => {
    await deleteUser(user.username ?? '')
  })

  it('should respond with 200 status code and return the user data', async () => {
    const response = await request(app)
      .get(`/user/info?u=${user.username ?? ''}`)
      .expect(200)

    expect(response.body).toHaveProperty('profileImage')
    expect(response.body).toHaveProperty('displayName')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('posts')
  })

  it('should respond with 400 status code if the user send no username', async () => {
    const response = await request(app).get('/user/info?u=').expect(400)

    expect(response.body).toHaveProperty('error')
  })
})
