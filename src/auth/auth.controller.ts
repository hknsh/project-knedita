import {
	Body,
	Controller,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import {
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LoginUserDTO } from "./dto/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("/")
	@ApiOperation({ summary: "Authenticates a user" })
	@ApiOkResponse({ status: 200, description: "Authenticated successfully" })
	@ApiUnauthorizedResponse({ description: "Wrong username or password" })
	@HttpCode(200)
	async login(@Request() req, @Body() _: LoginUserDTO) {
		return this.authService.login(req.user);
	}
}
