import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Public } from "src/public.decorator";
import { UpdateNameDTO } from "./dto/update-name.dto";
import { User } from "./types/user.type";
import { UpdateEmailDTO } from "./dto/update-email.dto";
import { UpdatePasswordDTO } from "./dto/update-password.dto";
import { File, FileInterceptor } from "@nest-lab/fastify-multer";
import { BufferValidator } from "src/validators/buffer-validator.pipe";
import UploadImageSchema from "./schemas/upload-image.schema";
import UploadImageValidator from "src/validators/upload-image.validator";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  // POST
  @Public()
  @Post()
  @ApiOperation({ summary: "Creates a new account" })
  @ApiCreatedResponse({ description: "Account created successfully" })
  @ApiBadRequestResponse({
    description:
      "Missing field / Invalid username / Invalid email / Weak password",
  })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  // GET
  @Get("/profile")
  @ApiOperation({ summary: "Returns information about the logged user" })
  @ApiBearerAuth("JWT")
  @ApiUnauthorizedResponse({
    description: "Not authenticated / Invalid JWT Token",
  })
  me(@Request() req) {
    return req.user;
  }

  @Public()
  @Get(":username")
  @ApiOperation({ summary: "Returns information about a user" })
  @ApiNotFoundResponse({ description: "User not found" })
  @HttpCode(200)
  info(@Param("username") username: string) {
    return this.userService.info(username);
  }

  // PATCH
  @Patch()
  @ApiOperation({
    summary: "Updates the username or display name of a logged user",
  })
  @ApiBearerAuth("JWT")
  updateName(@Body() { displayName, username }: UpdateNameDTO, @Request() req) {
    return this.userService.updateName(req.user as User, username, displayName);
  }

  @Patch("/email")
  @ApiOperation({ summary: "Updates the email of a logged user" })
  @ApiBearerAuth("JWT")
  updateEmail(@Body() body: UpdateEmailDTO, @Request() req) {
    return this.userService.updateEmail(req.user as User, body.email);
  }

  @Patch("/password")
  @ApiOperation({ summary: "Updates the password of a logged user" })
  @ApiBearerAuth("JWT")
  updatePassword(
    @Body() { old_password, new_password }: UpdatePasswordDTO,
    @Request() req,
  ) {
    return this.userService.updatePassword(
      req.user as User,
      old_password,
      new_password,
    );
  }

  @Patch("/image")
  @ApiOperation({
    summary: "Add a profile image",
  })
  @ApiBearerAuth("JWT")
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody(UploadImageSchema)
  uploadProfileImage(
    @UploadedFile(
      UploadImageValidator,
      new BufferValidator(), // Magic number validation
    )
    image: File,
    @Request() req,
  ) {
    return this.userService.uploadImage(req.user, image);
  }

  // DELETE
  @Delete()
  @ApiOperation({ summary: "Deletes the account of a logged user" })
  @ApiBearerAuth("JWT")
  remove() {}
}
