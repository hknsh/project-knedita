import { FastifyMulterModule } from "@nest-lab/fastify-multer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { S3Module } from "nestjs-s3";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";
import { ZodValidationPipe } from "nestjs-zod";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { KweeksModule } from "./kweeks/kweeks.module";
import { UserModule } from "./users/users.module";

@Module({
	imports: [
		UserModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			throttlers: [{ limit: 10, ttl: 60000 }],
			storage: new ThrottlerStorageRedisService(
				`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
			),
		}),
		KweeksModule,
		FastifyMulterModule,
		S3Module.forRoot({
			config: {
				credentials: {
					accessKeyId: process.env.MINIO_ROOT_USER, // CHANGE WHEN PRODUCTION TO S3
					secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
				},
				region: "us-east-1",
				endpoint: process.env.MINIO_ENDPOINT,
				forcePathStyle: true,
			},
		}),
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
