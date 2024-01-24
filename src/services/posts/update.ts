import prisma from "clients/prisma-client";

async function postUpdateService(
  postId: string,
  content: string,
  userId: string
): Promise<Record<string, unknown> | Error> {
  const post = await prisma.post.findFirst({ where: { id: postId } });

  if (post === null) {
    return new Error("Post not found");
  }

  if ((await prisma.user.findFirst({ where: { id: userId } })) === null) {
    return new Error("User not found");
  }

  if (post.authorId !== userId) {
    return new Error("Forbidden");
  }

  if (post.content === content.trim()) {
    let postContent: string = content;
    postContent = post.content;
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          displayName: true,
          username: true,
        },
      },
    },
  });

  return updatedPost;
}
export default postUpdateService;
