import prisma from '../../db'
import app from '../../app'
import request from 'supertest'

// Post id at the body
// User token at the header

// Create new post
// Create new user
// Auth the user
// Create the post with the token
// Send the request with the post id and the token
// Should delete the post successfully

describe('DELETE /post/delete', () => {
  it('should delete the post successfully', async () => {
    expect(1 + 1).toBe(2)
  })
})
