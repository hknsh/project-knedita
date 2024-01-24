import prisma from "clients/prisma-client";

async function userUploadPictureService(
  authorId: string,
  url: string
): Promise<Record<string, unknown> | Error> {
  const user = await prisma.user.findFirst({ where: { id: authorId } });

  if (user == null) {
    return new Error("User does not exists");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      profileImage: url,
    },
    select: {
      profileImage: true,
    },
  });

  return updatedUser;
}

export default userUploadPictureService;
