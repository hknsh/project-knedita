import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { KweeksService } from "./kweeks.service";
import { CreateKweekDto } from "./dto/create-kweek.dto";
import { UpdateKweekDto } from "./dto/update-kweek.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "src/public.decorator";

@ApiTags("Kweeks")
@Controller("kweeks")
export class KweeksController {
  constructor(private readonly kweeksService: KweeksService) {}

  @Post()
  @ApiOperation({ summary: "Creates a kweek" })
  @ApiBearerAuth("JWT")
  create(@Body() createKweekDto: CreateKweekDto) {
    return this.kweeksService.create(createKweekDto);
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Retrieves information about a kweek" })
  findOne(@Param("id") id: string) {
    return this.kweeksService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Updates a kweek content" })
  @ApiBearerAuth("JWT")
  update(@Param("id") id: string, @Body() updateKweekDto: UpdateKweekDto) {
    return this.kweeksService.update(+id, updateKweekDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletes a kweek" })
  @ApiBearerAuth("JWT")
  remove(@Param("id") id: string) {
    return this.kweeksService.remove(+id);
  }

  @Post(":id/like")
  @ApiOperation({ summary: "Likes a kweek" })
  @ApiBearerAuth("JWT")
  likeKweek() {}

  @Public()
  @Get(":id/comments")
  @ApiOperation({ summary: "Retrieves comments of a kweek" })
  comments() {}

  @Public()
  @Get(":id/comments/:comment_id")
  @ApiOperation({ summary: "Retrieves information about a comment" })
  comment() {}

  @Patch(":id/comments/:comment_id")
  @ApiOperation({ summary: "Updates a comment content" })
  @ApiBearerAuth("JWT")
  updateComment() {}

  @Delete(":id/comments/:comment_id")
  @ApiOperation({ summary: "Deletes a comment" })
  @ApiBearerAuth("JWT")
  removeComment() {}

  @Post(":id/comments/:comment_id/like")
  @ApiOperation({ summary: "Likes a comment" })
  @ApiBearerAuth("JWT")
  likeComment() {}
}
