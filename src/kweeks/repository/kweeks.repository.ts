import { Injectable } from "@nestjs/common";
import { Database } from "src/services/kysely/kysely.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class KweeksRepository {
	constructor(private readonly database: Database) {}

	async create(content: string, authorId: string): Promise<{ id: string }> {
		const [kweek] = await this.database
			.insertInto("Kweek")
			.values({
				id: uuid(),
				content,
				authorId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning(["id"])
			.execute();

		return kweek;
	}

	async update(id: string, content: string) {
		return await this.database
			.updateTable("Kweek")
			.set({ content, updatedAt: new Date() })
			.where("id", "=", id)
			.returningAll()
			.executeTakeFirst();
	}

	async findOne(id: string) {
		return await this.database
			.selectFrom("Kweek")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
	}

	async delete(id: string) {
		return await this.database
			.deleteFrom("Kweek")
			.where("id", "=", id)
			.execute();
	}

	async like(userId: string, kweekId: string) {
		return await this.database
			.insertInto("KweekLike")
			.values({ userId, kweekId })
			.returningAll()
			.execute();
	}

	async dislike(kweekId: string, userId: string) {
		await this.database
			.deleteFrom("KweekLike")
			.where("kweekId", "=", kweekId)
			.where("userId", "=", userId)
			.execute();
	}

	async isAlreadyLiked(kweekId: string, userId: string) {
		return await this.database
			.selectFrom("KweekLike")
			.where("kweekId", "=", kweekId)
			.where("userId", "=", userId)
			.executeTakeFirst();
	}

	async addAttachments(kweekId: string, attachments: string[]) {
		return await this.database
			.updateTable("Kweek")
			.where("id", "=", kweekId)
			.set({ attachments })
			.returningAll()
			.executeTakeFirst();
	}

	async countLikes(id: string) {
		const count = await this.database
			.selectFrom("KweekLike")
			.where("kweekId", "=", id)
			.select(this.database.fn.countAll<number>().as("count"))
			.executeTakeFirstOrThrow();
		return count.count ?? 0;
	}

	async countComments(id: string) {
		const count = await this.database
			.selectFrom("Comments")
			.where("kweekId", "=", id)
			.select(this.database.fn.countAll<number>().as("count"))
			.executeTakeFirstOrThrow();
		return count.count ?? 0;
	}
}
