import prisma from '../../db'
import app from '../../app'
import request from 'supertest'

let token = ''

describe('POST /post/create', () => {
  beforeAll(async () => {
    await request(app).post('/user/create').send({
      username: 'dummmyuser7',
      email: 'random1@email.com',
      password: 'pass'
    })

    const response = await request(app).post('/user/auth').send({
      email: 'random1@email.com',
      password: 'pass'
    }).expect(200)

    token = response.body.token
  })

  afterAll(async () => {
    await prisma.post.deleteMany({
      where: {
        content: '4764ba063310b6f8bab31e8348b2188a'
      }
    })

    await prisma.user.deleteMany({
      where: {
        username: 'dummmyuser7'
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
