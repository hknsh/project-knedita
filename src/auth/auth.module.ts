import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Configuration } from "src/configuration";
import { UserModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
	controllers: [AuthController],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: Configuration.JWT_ACCESS_SECRET(),
			signOptions: { expiresIn: "1d" }, // TODO: add refresh tokens
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
