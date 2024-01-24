import type User from "interfaces/user";
import prisma from "clients/prisma-client";

async function userUpdateNameService({
  id,
  displayName,
  username,
}: User): Promise<Record<string, unknown> | Error> {
  const user = await prisma.user.findFirst({ where: { id } });

  if (user === null) {
    return new Error("User not found");
  }

  // Check if the provided username is different from the current user's data
  // if different, queries are made to check if the new username is already in use.

  if (username !== undefined && username.trim() !== user.username) {
    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser != null && existingUser.username !== user.username) {
      return new Error("Username already in use");
    }
  }

  if (user.id !== id) {
    return new Error("Forbidden");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      displayName: displayName ?? user.displayName,
      username: username ?? user.username,
    },
    select: {
      displayName: true,
      username: true,
      createdAt: true,
    },
  });

  return updatedUser;
}

export default userUpdateNameService;
