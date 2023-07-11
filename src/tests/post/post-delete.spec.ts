import prisma from '../../db'
import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'

let token = ''; let username = ''

describe('DELETE /post/delete', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()

    token = user.token ?? ''
    username = user.username ?? ''
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username
      }
    })

    await prisma.$disconnect()
  })

  it('should delete the post successfully', async () => {
    const response = await request(app)
      .post('/post/create')
      .send({
        content: 'lorem ipsum'
      })
      .set('Authorization', `Bearer ${token}`).expect(200)

    await request(app)
      .post('/post/delete')
      .send({
        postId: response.body.id
      })
      .set('Authorization', `Bearer ${token}`).expect(200)
  })
})
