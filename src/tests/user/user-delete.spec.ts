import prisma from '../../db'
import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'

let token = ''

describe('DELETE /user/delete', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()
    token = user.token ?? ''
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should delete the user successfully', async () => {
    await request(app).post('/user/delete')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
