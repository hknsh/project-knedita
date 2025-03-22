import { emailSchema } from "@/common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const UpdateEmailSchema = z.object({
	email: emailSchema,
});

export class UpdateEmailDTO extends createZodDto(UpdateEmailSchema) {}
