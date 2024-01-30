import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { S3Service } from "./s3.service";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService],
})
export class UserModule {}
