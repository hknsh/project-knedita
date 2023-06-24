import request from 'supertest'
import prisma from '../../db'
import app from '../../app'

describe('POST /user/auth', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        username: 'dummmyuser6',
        email: 'test@test.com',
        password: 'pass'
      }
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username: 'dummmyuser6'
      }
    })
    await prisma.$disconnect()
  })

  it('should respond with a error if the user does not exists', async () => {
    const response = await request(app)
      .post('/user/auth')
      .send({
        email: 'mm@mm.com',
        password: 'aa'
      }).expect(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('User does not exists')
  })

  it('should respond with a error if receive an invalid email or password', async () => {
    const response = await request(app)
      .post('/user/auth').send({
        email: 'test@test.com',
        password: 'haha'
      }).expect(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Invalid email or password')
  })

  it('should respond with a error if receive an empty body', async () => {
    const response = await request(app).post('/user/auth').send({}).expect(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Missing fields')
  })
})
