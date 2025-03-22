import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateKweekSchema = z.object({
	content: z.string(),
	attachments: z.array(z.any()).optional(),
});

export class CreateKweekDTO extends createZodDto(CreateKweekSchema) {}
