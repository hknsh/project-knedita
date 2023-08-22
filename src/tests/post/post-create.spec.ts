import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'
import deleteUser from '../utils/delete-user'
import type User from 'interfaces/user'

let user: User

describe('POST /post/create', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteUser(user.username!)
  })

  it('should respond with 200 status code if the user send the token and the content', async () => {
    const response = await request(app)
      .post('/post/create')
      .send({
        content: 'Hello world'
      })
      .set('Authorization', `Bearer ${user.token ?? ''}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: expect.any(String),
        authorId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    )
  })

  it('should respond with 400 status code if the user send no token', async () => {
    const response = await request(app).post('/post/create').expect(401)

    expect(response.body).toHaveProperty('error')
  })
})
