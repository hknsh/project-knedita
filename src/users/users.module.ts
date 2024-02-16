import { Module } from "@nestjs/common";
import { PrismaModule } from "src/services/prisma/prisma.module";
import { S3Service } from "src/services/s3/s3.service";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService, S3Service],
	exports: [UserService],
})
export class UserModule {}
