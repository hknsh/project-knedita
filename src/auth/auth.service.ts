import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserModel } from "src/users/models/user.model";
import { UserService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<UserModel | null> {
		const user = await this.userService.auth_search(username);

		if (user === undefined) {
			return null;
		}

		const validation = await bcrypt.compare(password, user.password);

		if (user && validation) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

	async login(user: UserModel): Promise<{ token: string }> {
		const payload = {
			displayName: user.displayName,
			username: user.username,
			profileImage: user.profileImage,
			sub: user.id,
		};

		return {
			token: this.jwtService.sign(payload),
		};
	}
}
