import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const UpdateKweekSchema = z
	.object({
		id: z.string().toLowerCase().describe("New username - optional"),
		content: z.string({ required_error: "Content is required" }).max(300),
	})
	.required();

export class UpdateKweekDTO extends createZodDto(UpdateKweekSchema) {}
