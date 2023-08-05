import request from 'supertest'
import app from '../../app'
import deleteUser from '../utils/delete-user'
import signUpNewUser from '../utils/create-user'
import type User from '../../interfaces/user'

let user: User

describe('POST /user/auth', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  afterAll(async () => {
    await deleteUser(user.username ?? '')
  })

  it('should respond with a error if the user does not exists', async () => {
    const response = await request(app)
      .post('/user/auth')
      .send({ email: 'mm@mm.com', password: 'aa' })
      .expect(400)

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('User does not exists')
  })

  it('should respond with a error if receive an invalid email or password', async () => {
    const response = await request(app)
      .post('/user/auth')
      .send({ email: user.email, password: 'fake_pass' })
      .expect(400)

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Invalid email or password')
  })

  it('should respond with a error if receive an empty body', async () => {
    const response = await request(app).post('/user/auth').send({}).expect(400)

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Missing fields')
  })
})
