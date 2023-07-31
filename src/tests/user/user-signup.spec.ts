import request from 'supertest'
import app from '../../app'
import deleteUser from '../utils/delete-user'
import signUpNewUser from '../utils/create-user'
import type userPayload from '../../interfaces/user'

let user: userPayload

describe('POST /user/signup', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
    delete user.token
  })

  afterAll(async () => {
    await deleteUser(user.username ?? '')
  })

  it('should respond with a 400 status code if sent any invalid data', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        username: 'username12@',
        email: user.email,
        password: user.password
      })
      .expect(400)
  })

  it('should respond with a 400 status code for an existing username or email', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        username: user.username,
        email: user.email,
        password: user.password
      })
      .expect(400)
  })

  it('should respond with a 400 status code if receive an empty body', async () => {
    await request(app).post('/user/signup').send({}).expect(400)
  })
})
