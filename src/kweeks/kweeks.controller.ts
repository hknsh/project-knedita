import { File, FilesInterceptor } from "@nest-lab/fastify-multer";
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { ApiCreateKweek } from "src/decorators/create-kweek.decorator";
import { Public } from "src/decorators/public.decorator";
import { MultiFileValidation } from "src/validators/multi-file.validator";
import { UpdateKweekDTO } from "./dto/update-kweek.dto";
import { KweeksService } from "./kweeks.service";

@ApiTags("Kweeks")
@Controller("kweeks")
export class KweeksController {
	constructor(private readonly kweeksService: KweeksService) {}

	@Post()
	@ApiConsumes("multipart/form-data")
	@ApiCreateKweek("attachments")
	@UseInterceptors(FilesInterceptor("attachments", 4))
	@ApiOperation({ summary: "Creates a kweek" })
	@ApiBearerAuth("JWT")
	create(
		@UploadedFiles(new MultiFileValidation()) attachments: Array<File>,
		@Body() body,
		@Request() req,
	) {
		return this.kweeksService.create(body.content, req.user.id, attachments);
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
	update(@Param("id") id: string, @Body() updateKweekDto: UpdateKweekDTO) {
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
