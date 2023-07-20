/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../../clients/prisma-client'

export default async function deleteUser (username: string) {
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
}
