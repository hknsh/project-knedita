import { File } from "@nest-lab/fastify-multer";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";
import { selectCommentsWithReplies } from "./schemas/prisma_queries.schema";

@Injectable()
export class CommentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}

	async create(
		kweek_id: string,
		content: string,
		user_id: string,
		files: Array<File>,
	) {
		if (content.length > 300) {
			throw new BadRequestException(
				"Content too big. Must have 300 characters or lower",
			);
		}

		// Verifies if the kweek_id is a kweek or a comment
		const parentComment = await this.prisma.comments.findUnique({
			where: { id: kweek_id },
		});

		let kweek = null;

		if (parentComment === null) {
			kweek = await this.prisma.kweek.findFirst({
				where: { id: kweek_id },
			});

			if (kweek === null) {
				throw new NotFoundException("Kweek/Comment not found");
			}
		}

		const { id } = await this.prisma.comments.create({
			data: {
				content,
				userId: user_id,
				kweekId: kweek ? kweek.id : null,
				parentId: parentComment ? parentComment.id : null,
			},
			select: {
				id: true,
			},
		});

		let attachments = [];

		if (files && files.length > 0) {
			attachments = await this.s3.multiImageUpload(id, files);
		}

		await this.prisma.comments.update({
			where: {
				id,
			},
			data: {
				attachments,
			},
		});

		return await this.prisma.comments.findFirst({ where: { id } });
	}

	async info(comment_id: string) {
		const comment = await this.prisma.comments.findUnique({
			where: { id: comment_id },
			select: {
				...selectCommentsWithReplies,
			},
		});

		if (comment === null) {
			throw new NotFoundException("Comment not found");
		}

		return comment;
	}

	async update(comment_id: string, user_id: string, content: string) {
		let new_content = content;

		const comment = await this.prisma.comments.findFirst({
			where: { id: comment_id },
		});

		if (comment === null) {
			throw new NotFoundException("Comment not found");
		}

		if (comment.userId !== user_id) {
			throw new UnauthorizedException("Forbidden");
		}

		if (comment.content === content.trim()) {
			new_content = comment.content;
		}

		return await this.prisma.comments.update({
			where: {
				id: comment_id,
			},
			data: {
				content: new_content,
			},
			select: {
				...selectCommentsWithReplies,
			},
		});
	}

	async delete(comment_id: string, user_id: string) {
		const comment = await this.prisma.comments.findFirst({
			where: { id: comment_id },
		});

		if (comment === null) {
			throw new NotFoundException("Comment not found");
		}

		if (comment.userId !== user_id) {
			throw new UnauthorizedException("Forbidden");
		}

		await this.s3.deleteFiles(comment.attachments);

		await this.prisma.comments.delete({
			where: {
				id: comment_id,
			},
		});

		return {};
	}

	async like(comment_id: string, user_id: string) {
		const comment = await this.prisma.comments.findFirst({
			where: {
				id: comment_id,
			},
		});

		if (comment === null) {
			throw new NotFoundException("Comment not found");
		}

		const is_comment_already_liked = await this.prisma.commentLike.findFirst({
			where: {
				commentId: comment.id,
				userId: user_id,
			},
		});

		if (is_comment_already_liked !== null) {
			await this.prisma.commentLike.deleteMany({
				where: {
					commentId: comment.id,
					userId: user_id,
				},
			});

			return {};
		}

		return await this.prisma.commentLike.create({
			data: {
				commentId: comment.id,
				userId: user_id,
			},
		});
	}
}
