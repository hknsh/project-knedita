import { Module } from "@nestjs/common";
import { PrismaModule } from "src/services/prisma/prisma.module";
import { S3Service } from "src/services/s3/s3.service";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { KweeksController } from "./kweeks.controller";
import { KweeksService } from "./kweeks.service";

@Module({
	imports: [PrismaModule],
	controllers: [KweeksController, CommentsController],
	providers: [KweeksService, S3Service, CommentsService],
})
export class KweeksModule {}
