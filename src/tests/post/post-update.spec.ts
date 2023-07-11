import prisma from '../../db'
import app from '../../app'
import request from 'supertest'
import signUpNewUser from '../utils/create-user'

let token = ''; let username = ''

describe('PUT /post/update', () => {
  beforeAll(async () => {
    const user = await signUpNewUser()

    username = user.username ?? ''
    token = user.token ?? ''
  })

  afterAll(async () => {
    await prisma.post.deleteMany({
      where: {
        author: {
          username
        }
      }
    })

    await prisma.user.deleteMany({
      where: {
        username
      }
    })

    await prisma.$disconnect()
  })

  it('should create a new post and update the content of it', async () => {
    const post = await request(app).post('/post/create').send({
      content: 'Lorem'
    }).set('Authorization', `Bearer ${token}`).expect(200)

    expect(post.body).toHaveProperty('id')

    const fieldsToUpdate = {
      postId: post.body.id,
      content: 'Lorem ipsum'
    }

    const response = await request(app)
      .put('/post/update')
      .send(fieldsToUpdate)
      .set('Authorization', `Bearer ${token}`).expect(200)

    // Post content should be Lorem Ipsum
    if (post.body.content === response.body.content) {
      throw new Error('Post didn\'t update')
    }

    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      content: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      author: expect.any(Object)
    }))
  })
})
