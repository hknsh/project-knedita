import app from '../../app'
import { describe, beforeAll, afterAll, it } from 'vitest'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'
import deleteUser from '../utils/delete-user'
import type User from 'interfaces/user'

let user: User

describe('DELETE /post/delete', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteUser(user.username!)
  })

  it('should delete the post successfully', async () => {
    const response = await request(app)
      .post('/post/create')
      .send({
        content: 'lorem ipsum',
      })
      .set('Authorization', `Bearer ${user.token ?? ''}`)
      .expect(200)

    await request(app)
      .post('/post/delete')
      .send({
        postId: response.body.id,
      })
      .set('Authorization', `Bearer ${user.token ?? ''}`)
      .expect(200)
  })
})
