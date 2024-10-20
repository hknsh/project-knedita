import { Module } from "@nestjs/common";
import { S3Service } from "src/services/s3/s3.service";
import { UsersRepository } from "./repository/users.repository";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
	controllers: [UserController],
	providers: [UserService, S3Service, UsersRepository],
	exports: [UserService],
})
export class UserModule {}
