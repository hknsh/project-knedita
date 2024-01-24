import * as bcrypt from "bcrypt";
import prisma from "clients/prisma-client";

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,}$/;

async function userUpdatePasswordService(
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<Record<string, unknown> | Error> {
  if (!passwordRegex.test(newPassword)) {
    return new Error(
      "New password must have at least 8 characters, one number and one special character."
    );
  }

  const user = await prisma.user.findFirst({ where: { id } });

  if (user === null) {
    return new Error("User not found");
  }

  if (user.id !== id) {
    return new Error("Forbidden");
  }

  const validPassword = await bcrypt.compare(
    currentPassword.replace(/ /g, ""),
    user.password
  );

  if (!validPassword) {
    return new Error("Invalid password");
  }

  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(newPassword.replace(/ /g, ""), salt);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
    select: {
      displayName: true,
      username: true,
      createdAt: true,
    },
  });

  return { message: "Successfully updated user password" };
}

export default userUpdatePasswordService;
