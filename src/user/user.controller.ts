import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  @ApiOperation({ summary: "Creates a new account" })
  @ApiResponse({ status: 200, description: "Account created successfully" })
  @ApiResponse({
    status: 400,
    description:
      "Missing field / Invalid username / Invalid email / Weak password",
  })
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }
}
