import prisma from '../../db'
import app from '../../app'
import request from 'supertest'

let token = ''

describe('POST /user/info', () => {
  beforeAll(async () => {
    await request(app).post('/user/create').send({
      username: 'dummmyuser5',
      email: 'random3@email.com',
      password: 'pass'
    })

    const response = await request(app).post('/user/auth').send({
      email: 'random3@email.com',
      password: 'pass'
    }).expect(200)

    token = response.body.token
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username: 'dummmyuser5'
      }
    })
    await prisma.$disconnect()
  })

  it('should respond with 200 status code and return the user data', async () => {
    const response = await request(app).get('/user/info').set('Authorization', `Bearer ${token}`).expect(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('displayName')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('should respond with 400 status code if the user send no token', async () => {
    const response = await request(app).get('/user/info').expect(401)

    expect(response.body).toHaveProperty('error')
  })
})
