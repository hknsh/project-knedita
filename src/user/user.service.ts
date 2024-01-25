import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma.service";
import { UserModel } from "./models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({
    username,
    email,
    password,
  }: CreateUserDTO): Promise<
    Pick<UserModel, "displayName" | "username" | "createdAt">
  > {
    if ((await this.prisma.user.findFirst({ where: { username } })) != null) {
      throw new BadRequestException("Username already in use");
    }

    if ((await this.prisma.user.findFirst({ where: { email } })) != null) {
      throw new BadRequestException("Email already in use");
    }

    // Password encryption
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
      select: {
        displayName: true,
        username: true,
        createdAt: true,
      },
    });

    return user;
  }

  async search(username: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        profileImage: true,
        displayName: true,
        username: true,
        password: true,
      },
    });

    if (user == null) {
      return undefined;
    }

    return user;
  }
}
