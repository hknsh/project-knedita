import prisma from 'clients/prisma-client'
import logger from 'helpers/logger'
import { Server } from 'socket.io'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function createSocketIOInstance(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN ?? '*',
    },
  })

  io.use(async (socket, next) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!socket.handshake.auth?.id) {
      const error = new Error()
      error.message = 'Unauthorized'
      next(error)
    }

    await prisma.user.update({
      where: {
        id: socket.handshake.auth.id,
      },
      data: {
        socketId: socket.id,
      },
    })

    next()
  })

  /*
  const handleConnection = (socket) => {
    // TODO
  }
  */

  io.on('connection', _ => {
    logger.info('Placeholder')
  })

  return io
}
