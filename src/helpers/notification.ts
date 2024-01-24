import { type NotificationType } from "@prisma/client";
import prisma from "clients/prisma-client";

export async function createNotification(
  fromUserId: string,
  toUserId: string,
  content: string,
  type: NotificationType
): Promise<Record<never, never> | Error> {
  try {
    await prisma.notifications.create({
      data: {
        type,
        fromUserId,
        toUserId,
        content,
      },
      include: {
        fromUser: {
          select: {
            id: true,
            displayName: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });
    return {};
  } catch (_) {
    return new Error("Error while creating notification");
  }
}

export async function countNotifications(
  toUserId: string
): Promise<number | Error> {
  try {
    const count = await prisma.notifications.count({
      where: {
        toUserId,
      },
    });

    return count;
  } catch (_) {
    return new Error("Error while counting user notifications");
  }
}
