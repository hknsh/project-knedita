import { usernameSchema } from "@common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const FollowUserSchema = z.object({
	username: usernameSchema,
});

export class FollowUserDTO extends createZodDto(FollowUserSchema) {}
