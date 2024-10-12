import { File } from "@nest-lab/fastify-multer";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";
import { selectComments, selectUser } from "./schemas/prisma_queries.schema";

@Injectable()
export class KweeksService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}
	async create(content: string, authorId: string, files: Array<File>) {
		if (content.length > 300) {
			throw new BadRequestException(
				"Content too big. Must have 300 characters or lower",
			);
		}

		const { id } = await this.prisma.kweek.create({
			data: {
				content,
				authorId,
			},
			select: {
				id: true,
			},
		});

		let attachments = [];

		if (files && files.length > 0) {
			attachments = await this.s3.multiImageUpload(id, files);
		}

		await this.prisma.kweek.update({
			where: {
				id,
			},
			data: {
				attachments,
			},
		});

		return await this.prisma.kweek.findFirst({ where: { id } });
	}

	async findOne(id: string) {
		const post = await this.prisma.kweek.findFirst({
			where: {
				id,
			},
			include: {
				author: selectUser,
				_count: {
					select: { comments: true, likes: true },
				},
				likes: true,
				comments: selectComments,
			},
		});

		if (post === null) {
			throw new NotFoundException("Post not found");
		}

		return post;
	}

	async update(user_id: string, post_id: string, content: string) {
		let new_content = content;

		const post = await this.prisma.kweek.findFirst({ where: { id: post_id } });

		if (post === null) {
			throw new NotFoundException("Post not found");
		}

		if (post.authorId !== user_id) {
			throw new UnauthorizedException("Forbidden");
		}

		if (post.content === content.trim()) {
			new_content = post.content;
		}

		return await this.prisma.kweek.update({
			where: {
				id: post_id,
			},
			data: {
				content: new_content,
			},
			select: {
				id: true,
				content: true,
				attachments: true,
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
	}

	async remove(user_id: string, id: string) {
		const post = await this.prisma.kweek.findFirst({ where: { id } });

		if (post === null) {
			throw new NotFoundException("Post not found");
		}

		if (post.authorId !== user_id) {
			throw new UnauthorizedException("Forbidden");
		}

		await this.s3.deleteFiles(post.attachments);

		await this.prisma.kweek.delete({
			where: {
				id,
			},
		});

		return {};
	}

	async like(user_id: string, kweek_id: string) {
		const kweek = await this.prisma.kweek.findFirst({
			where: {
				id: kweek_id,
			},
		});

		if (kweek === null) {
			throw new NotFoundException("Post not found");
		}

		const is_kweek_already_liked = await this.prisma.kweekLike.findFirst({
			where: {
				kweekId: kweek.id,
				userId: user_id,
			},
		});

		if (is_kweek_already_liked !== null) {
			await this.prisma.kweekLike.deleteMany({
				where: {
					kweekId: kweek.id,
					userId: user_id,
				},
			});

			return {};
		}

		return await this.prisma.kweekLike.create({
			data: {
				kweekId: kweek.id,
				userId: user_id,
			},
		});
	}
}
