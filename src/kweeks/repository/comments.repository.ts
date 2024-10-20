import { Injectable } from "@nestjs/common";
import { Database } from "src/services/kysely/kysely.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class CommentsRepository {
	constructor(private readonly database: Database) {}

	async create(
		content: string,
		userId: string,
		kweekId: string | null,
		parentId: string | null,
	): Promise<{ id: string }> {
		const [comment] = await this.database
			.insertInto("Comments")
			.values({
				id: uuid(),
				content,
				userId,
				kweekId,
				parentId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning(["id"])
			.execute();

		return comment;
	}

	async update(id: string, content: string) {
		return await this.database
			.updateTable("Comments")
			.set({ content, updatedAt: new Date() })
			.where("id", "=", id)
			.returningAll()
			.executeTakeFirst();
	}

	async findOne(id: string) {
		return await this.database
			.selectFrom("Comments")
			.select([
				"id",
				"content",
				"attachments",
				"createdAt",
				"userId",
				"updatedAt",
				"kweekId",
				"parentId",
			])
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async delete(id: string) {
		return await this.database
			.deleteFrom("Comments")
			.where("id", "=", id)
			.execute();
	}

	async like(userId: string, commentId: string) {
		return await this.database
			.insertInto("CommentLike")
			.values({ userId, commentId })
			.returningAll()
			.execute();
	}

	async dislike(commentId: string, userId: string) {
		await this.database
			.deleteFrom("CommentLike")
			.where("commentId", "=", commentId)
			.where("userId", "=", userId)
			.execute();
	}

	async isAlreadyLiked(commentId: string, userId: string) {
		return await this.database
			.selectFrom("CommentLike")
			.where("commentId", "=", commentId)
			.where("userId", "=", userId)
			.executeTakeFirst();
	}

	async addAttachments(commentId: string, attachments: string[]) {
		return await this.database
			.updateTable("Comments")
			.where("id", "=", commentId)
			.set({ attachments })
			.returningAll()
			.executeTakeFirst();
	}

	async countLikes(id: string) {
		const count = await this.database
			.selectFrom("CommentLike")
			.where("commentId", "=", id)
			.select(this.database.fn.countAll<number>().as("count"))
			.executeTakeFirstOrThrow();

		return count.count ?? 0;
	}

	async countComments(id: string) {
		const count = await this.database
			.selectFrom("Comments")
			.where((qb) => qb("kweekId", "=", id).or("parentId", "=", id))
			.select(this.database.fn.countAll<number>().as("count"))
			.executeTakeFirstOrThrow();

		return count.count ?? 0;
	}
}
