import { type NotificationType } from '@prisma/client'
import prisma from 'clients/prisma-client'

export default async function createNotification (
  fromUserId: string,
  toUserId: string,
  content: string,
  type: NotificationType
): Promise<Record<never, never> | Error> {
  await prisma.notifications.create({
    data: {
      type,
      fromUserId,
      toUserId,
      content
    },
    include: {
      fromUser: {
        select: {
          id: true,
          displayName: true,
          username: true,
          profileImage: true
        }
      }
    }
  })
  return {}
}
