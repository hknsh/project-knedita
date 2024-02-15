import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { S3Service } from "src/services/s3/s3.service";

@Injectable()
export class CommentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}
}
