import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const UpdateKweekSchema = z
	.object({
		post_id: z.string({ required_error: "Post ID is required" }),
		content: z.string({ required_error: "Content is required" }).max(300),
	})
	.required();

export class UpdateKweekDTO extends createZodDto(UpdateKweekSchema) {}
