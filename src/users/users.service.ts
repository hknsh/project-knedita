import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModel } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { User } from "./types/user.type";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async auth_search(username: string): Promise<UserModel> {
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

  async info(username: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        profileImage: true,
        displayName: true,
        username: true,
        createdAt: true,
        followers: true,
        following: true,
        kweeks: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (user === null) {
      throw new NotFoundException("User not found");
    }

    return {
      ...user,
      followers: user.followers.length,
      following: user.following.length,
    };
  }

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

  async updateName(
    loggedUser: User,
    username: string | undefined,
    displayName: string,
  ): Promise<Pick<User, "username" | "displayName">> {
    const user = await this.prisma.user.findFirst({
      where: { id: loggedUser.id },
    });

    if (username !== undefined && username.trim() !== user.username) {
      const isAlreadyInUse = await this.prisma.user.findFirst({
        where: { username },
      });
      if (isAlreadyInUse != null && isAlreadyInUse.username !== user.username) {
        throw new BadRequestException("Username already in use");
      }
    }

    return await this.prisma.user.update({
      where: {
        id: loggedUser.id,
      },
      data: {
        displayName,
        username: username ?? user.username,
      },
      select: {
        displayName: true,
        username: true,
      },
    });
  }
}
