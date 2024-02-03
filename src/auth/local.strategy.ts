import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserModel } from "src/users/models/user.model";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<UserModel> {
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new UnauthorizedException("Wrong username or password");
		}
		return user;
	}
}
