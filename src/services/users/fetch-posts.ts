import prisma from "clients/prisma-client";

async function userFetchPostsService(
  username: string
): Promise<unknown | Error> {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        username,
      },
    },
    select: {
      _count: true,
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          displayName: true,
          username: true,
          profileImage: true,
        },
      },
    },
  });
  return posts;
}

export default userFetchPostsService;
