import { File } from "@nest-lab/fastify-multer";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserModel } from "./models/user.model";
import { S3Service } from "./s3.service";
import { User } from "./types/user.type";

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}
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

	async updateEmail(
    id: string,
		email: string,
	): Promise<{ message: string }> {
		const user = await this.prisma.user.findFirst({
			where: { id },
		});

		if (email !== undefined && email.trim() !== user.email) {
			const isAlreadyInUse = await this.prisma.user.findFirst({
				where: { email },
			});
			if (isAlreadyInUse != null && isAlreadyInUse.email !== user.email) {
				throw new BadRequestException("Email already in use");
			}

			await this.prisma.user.update({
				where: {
					id,
				},
				data: {
					email: email ?? user.email,
				},
			});

			return { message: "Email updated successfully" };
		}
	}

	async updateName(
		id: string,
		username: string | undefined,
		displayName: string,
	): Promise<Pick<User, "username" | "displayName">> {
		const user = await this.prisma.user.findFirst({
			where: { id },
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
				id
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

	async updatePassword(
		id: string,
		old_password: string,
		new_password: string,
	): Promise<{ message: string }> {
		const user = await this.prisma.user.findFirst({
			where: { id },
		});

		const validatePassword = await bcrypt.compare(old_password, user.password);

		if (!validatePassword) {
			throw new BadRequestException("Wrong password");
		}

		const salt = await bcrypt.genSalt(15);
		const hash = await bcrypt.hash(new_password, salt);

		await this.prisma.user.update({
			where: {
				id,
			},
			data: {
				password: hash,
			},
		});

		return { message: "Password updated successfully" };
	}

	async uploadImage(id: string, image: File) {
		const url = await this.s3.uploadImageToMinio(
			id,
			image.buffer,
		);

		return await this.prisma.user.update({
			where: {
				id,
			},
			data: {
				profileImage: url,
			},
			select: {
				profileImage: true,
			},
		});
	}

  async delete(id: string) {
    // TODO: Add validation for safety (like e-mail confirmation or password)
    try {
      await this.prisma.user.deleteMany({where: {id}});;
      return { message: "User deleted"}
    } catch (e) {
      throw new BadRequestException('Error while trying to delete user')
    }
  }
}
