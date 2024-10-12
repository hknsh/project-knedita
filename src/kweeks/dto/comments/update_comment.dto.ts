import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const UpdateCommentSchema = z
	.object({
		content: z.string({ required_error: "Content is required" }).max(300),
	})
	.required();

export class UpdateCommentDTO extends createZodDto(UpdateCommentSchema) {}
