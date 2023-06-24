import request from 'supertest'
import prisma from '../../db'
import app from '../../app'

const mockUser = {
  username: 'dummmyuser1',
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
        username: 'dummmyuser2',
        email: 'user@email.com',
        password: 'reallystrongpass'
      }
    })

    const response = await request(app).post('/user/create').send({
      username: 'dummmyuser2',
      email: 'user1@email.com',
      password: 'reallystrongpass'
    }).expect(400)

    expect(response.body).toHaveProperty('error')
  })

  it('should respond with a 400 status code for an existing email', async () => {
    await prisma.user.create({
      data: {
        username: 'dummmyuser3',
        email: 'user13@email.com',
        password: '1234'
      }
    })

    const response = await request(app).post('/user/create').send({
      username: 'dummmyuser4',
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
  const usersToDelete = ['dummmyuser1', 'dummmyuser2', 'dummmyuser3', 'dummmyuser4']

  await prisma.user.deleteMany({
    where: {
      username: {
        in: usersToDelete
      }
    }
  })

  await prisma.$disconnect()
})
