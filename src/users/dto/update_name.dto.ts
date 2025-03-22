import { usernameSchema } from "@/common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const UpdateNameSchema = z.object({
	username: usernameSchema,
	displayName: z.string().optional().or(z.literal("")),
});

export class UpdateNameDTO extends createZodDto(UpdateNameSchema) {}
