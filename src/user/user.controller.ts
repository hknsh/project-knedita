import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Public } from "src/public.decorator";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  // GET
  @Get("/me")
  @ApiOperation({ summary: "Returns information about the logged user" })
  @ApiBearerAuth("JWT")
  @ApiUnauthorizedResponse({
    description: "Not authenticated / Invalid JWT Token",
  })
  async me(@Request() req) {
    return req.user; // TODO: Add typing to req.user
  }

  // POST
  @Public()
  @Post("/signup")
  @ApiOperation({ summary: "Creates a new account" })
  @ApiCreatedResponse({ description: "Account created successfully" })
  @ApiBadRequestResponse({
    description:
      "Missing field / Invalid username / Invalid email / Weak password",
  })
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  // PUT
}
