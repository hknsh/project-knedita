import app from '../../app'
import { expect, describe, beforeAll, afterAll, it } from 'vitest'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'
import deleteUser from '../utils/delete-user'
import type User from 'interfaces/user'

let postId: string

let user: User

describe('POST /post/info', () => {
  beforeAll(async () => {
    user = await signUpNewUser()

    const token = user.token ?? ''

    const post = await request(app)
      .post('/post/create')
      .send({
        content: 'Hello world',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    postId = post.body.id
  })

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteUser(user.username!)
  })

  it('should respond with 200 status code and return some info about the post', async () => {
    const response = await request(app)
      .get(`/post/info?id=${postId}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        content: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        author: expect.any(Object),
      }),
    )
  })

  it('should respond with 400 status code if the post does not exists', async () => {
    const response = await request(app).get('/post/info?id=abc').expect(400)

    expect(response.body).toHaveProperty('error')
  })
})
