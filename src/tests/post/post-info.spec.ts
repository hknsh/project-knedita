import prisma from '../../db'
import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'

let postId = ''; let username = ''

describe('POST /post/info', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()

    const token = user.token ?? ''

    const post = await request(app).post('/post/create').send({
      content: 'nothing to see here!'
    }).set('Authorization', `Bearer ${token}`).expect(200)

    username = user.username ?? ''
    postId = post.body.id
  })

  afterAll(async () => {
    await prisma.post.deleteMany({
      where: {
        id: postId
      }
    })

    await prisma.user.deleteMany({
      where: {
        username
      }
    })
    await prisma.$disconnect()
  })

  it('should respond with 200 status code and return some info about the post', async () => {
    const response = await request(app).get(`/post/info?id=${postId}`).expect(200)

    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      content: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      author: expect.any(Object)
    }))
  })

  it('should respond with 400 status code if the post does not exists', async () => {
    const response = await request(app).get('/post/info?id=randominfohere').expect(400)

    expect(response.body).toHaveProperty('error')
  })
})
