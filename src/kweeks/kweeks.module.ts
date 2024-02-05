import { Module } from "@nestjs/common";
import { PrismaModule } from "src/services/prisma/prisma.module";
import { S3Service } from "src/services/s3/s3.service";
import { KweeksController } from "./kweeks.controller";
import { KweeksService } from "./kweeks.service";

@Module({
	imports: [PrismaModule],
	controllers: [KweeksController],
	providers: [KweeksService, S3Service],
})
export class KweeksModule {}
