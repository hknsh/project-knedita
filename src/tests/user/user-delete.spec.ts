import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'
import userPayload from '../../interfaces/user'

let user: userPayload

describe('DELETE /user/delete', () => {
  beforeAll(async () => {
    user = await signUpNewUser()
  })

  it('should delete the user successfully', async () => {
    await request(app).post('/user/delete')
      .set('Authorization', `Bearer ${user.token ?? ''}`)
      .expect(200)
  })
})
