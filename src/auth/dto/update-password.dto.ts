import { passwordSchema } from "@/common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const UpdatePasswordSchema = z.object({
	old_password: passwordSchema,
	new_password: passwordSchema,
});

export class UpdatePasswordDTO extends createZodDto(UpdatePasswordSchema) {}
