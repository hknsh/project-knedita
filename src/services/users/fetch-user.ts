import prisma from "clients/prisma-client";

async function userFetchUserService(
  id: string
): Promise<Record<string, unknown> | Error> {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      profileImage: true,
      displayName: true,
      username: true,
      createdAt: true,
      followers: true,
      following: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      likedPosts: {
        select: {
          postId: true,
        },
      },
    },
  });

  if (user === null) {
    return new Error("User not found");
  }

  const followers = user.followers.length;
  const following = user.following.length;

  const info = {
    ...user,
    followers,
    following,
  };

  return info;
}

export default userFetchUserService;
