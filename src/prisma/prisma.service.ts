import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
	extends PrismaClient<Prisma.PrismaClientOptions, "beforeExit">
	implements OnModuleInit
{
	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on("beforeExit", async () => {
			await app.close();
		});
	}
}
