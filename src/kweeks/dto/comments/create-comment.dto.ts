import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateCommentSchema = z.object({
	content: z.string(),
	attachments: z.array(z.any()).optional(),
});

export class CreateCommentDTO extends createZodDto(CreateCommentSchema) {}
