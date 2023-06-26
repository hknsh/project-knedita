import prisma from '../../db'
import app from '../../app'
import request from 'supertest'

describe('POST /user/info', () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username: 'dummmyuser5'
      }
    })
    await prisma.$disconnect()
  })

  it('should respond with 200 status code and return the user data', async () => {
    await prisma.user.create({
      data: {
        username: 'dummmyuser5',
        email: 'random3@email.com',
        password: 'pass'
      }
    })

    const response = await request(app).get('/user/info?u=dummmyuser5').expect(200)

    expect(response.body).toHaveProperty('displayName')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('posts')
  })

  it('should respond with 400 status code if the user send no username', async () => {
    const response = await request(app).get('/user/info?u=').expect(400)

    expect(response.body).toHaveProperty('error')
  })
})
