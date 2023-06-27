import request from 'supertest'
import app from '../../app'
import prisma from '../../db'
import signUpNewUser from '../utils/create-user'

let token = ''; let username = ''

describe('PUT /user/update', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()

    username = user.username
    token = user.token
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username
      }
    })

    await prisma.$disconnect()
  })

  it('should update the user successfully', async () => {
    const fieldsToUpdate = {
      displayName: 'Cookie'
    }

    const response = await request(app)
      .put('/user/update')
      .send(fieldsToUpdate)
      .set('Authorization', `Bearer ${token}`).expect(200)

    expect(response.body).toHaveProperty('displayName')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('createdAt')
  })
})
