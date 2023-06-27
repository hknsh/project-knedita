import prisma from '../../db'
import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'

let token = ''; let username = ''

describe('POST /post/create', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()

    token = user.token ?? ''
    username = user.username ?? ''
  })

  afterAll(async () => {
    await prisma.post.deleteMany({
      where: {
        content: '4764ba063310b6f8bab31e8348b2188a'
      }
    })

    await prisma.user.deleteMany({
      where: {
        username
      }
    })
    await prisma.$disconnect()
  })

  it('should respond with 200 status code if the user send the token and the content', async () => {
    const response = await request(app).post('/post/create').send({
      content: '4764ba063310b6f8bab31e8348b2188a'
    }).set('Authorization', `Bearer ${token}`).expect(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('content')
    expect(response.body).toHaveProperty('authorId')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  it('should respond with 400 status code if the user send no token', async () => {
    const response = await request(app).post('/post/create').expect(401)

    expect(response.body).toHaveProperty('error')
  })
})
