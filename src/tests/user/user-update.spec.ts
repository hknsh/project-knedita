import request from 'supertest'
import app from '../../app'
import signUpNewUser from '../utils/create-user'
import deleteUser from '../utils/delete-user'
import userPayload from '../../interfaces/user'

let user: userPayload

describe('PUT /user/update', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  afterAll(async () => {
    await deleteUser(user.username ?? '')
  })

  it('should update the user successfully', async () => {
    const fieldsToUpdate = {
      displayName: 'Cookie'
    }

    const response = await request(app)
      .put('/user/update')
      .send(fieldsToUpdate)
      .set('Authorization', `Bearer ${user.token ?? ''}`).expect(200)

    expect(response.body).toEqual(expect.objectContaining({
      displayName: expect.any(String),
      username: expect.any(String),
      createdAt: expect.any(String)
    }))
  })
})
