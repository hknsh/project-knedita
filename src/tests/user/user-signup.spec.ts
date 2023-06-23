import request from 'supertest'
import prisma from '../../../prisma/client'
import app from '../../app'

const mockUser = {
  username: 'username11',
  email: 'random@email.com',
  password: 'totallysafepass'
}

describe('POST /user/create', () => {
  it('should respond with a 200 status code', async () => {
    const response = await request(app).post('/user/create').send(mockUser).expect(200)

    expect(response.body).toHaveProperty('displayName')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('should respond with a 400 status code if sent any invalid data', async () => {
    await request(app).post('/user/create').send({
      username: 'username12@',
      email: mockUser.email,
      password: mockUser.password
    }).expect(400)
  })

  it('should respond with a 400 status code for an existing username', async () => {
    await prisma.user.create({
      data: {
        username: 'username12',
        email: 'user@email.com',
        password: 'reallystrongpass'
      }
    })

    const response = await request(app).post('/user/create').send({
      username: 'username12',
      email: 'user1@email.com',
      password: 'reallystrongpass'
    }).expect(400)

    expect(response.body).toHaveProperty('error')
  })

  it('should respond with a 400 status code for an existing email', async () => {
    await prisma.user.create({
      data: {
        username: 'username13',
        email: 'user13@email.com',
        password: '1234'
      }
    })

    const response = await request(app).post('/user/create').send({
      username: 'heythatscool',
      email: 'user13@email.com',
      password: '12345'
    }).expect(400)

    expect(response.body).toHaveProperty('error')
  })

  it('should respond with a 400 status code if receive an empty body', async () => {
    const response = await request(app).post('/user/create').send({}).expect(400)

    expect(response.body).toHaveProperty('error')
  })
})

afterAll(async () => {
  const usersToDelete = ['username11', 'username12', 'username13']

  await prisma.user.deleteMany({
    where: {
      username: {
        in: usersToDelete
      }
    }
  })

  await prisma.$disconnect()
})
