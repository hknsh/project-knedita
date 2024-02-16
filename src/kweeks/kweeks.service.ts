import { File } from "@nest-lab/fastify-multer";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";

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

		const attachments = await this.s3.multiImageUploadToMinio(id, files);

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
						profileImage: true,
					},
				},
				likes: true,
				comments: true,
			},
		});

		if (post === null) {
			throw new NotFoundException("Post not found");
		}

		return post;
	}

	update(id: string, content: string) {
		return `This action updates a #${id} kweek`;
	}

	remove(id: string) {
		return `This action removes a #${id} kweek`;
	}
}
