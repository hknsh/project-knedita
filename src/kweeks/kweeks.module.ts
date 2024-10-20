import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";
import { UsersRepository } from "src/users/repository/users.repository";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { KweeksController } from "./kweeks.controller";
import { KweeksService } from "./kweeks.service";
import { CommentsRepository } from "./repository/comments.repository";
import { KweeksRepository } from "./repository/kweeks.repository";

@Module({
	controllers: [KweeksController, CommentsController],
	providers: [
		PrismaService,
		KweeksService,
		S3Service,
		CommentsService,
		UsersRepository,
		CommentsRepository,
		KweeksRepository,
	],
})
export class KweeksModule {}
