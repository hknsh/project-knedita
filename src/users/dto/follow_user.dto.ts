import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const FollowUserSchema = z
	.object({
		username: z
			.string()
			.regex(
				/^[a-zA-Z0-9_.]{5,15}$/,
				"The username must have alphanumerics characters, underscore, dots and it must be between 5 and 15 characters",
			)
			.toLowerCase(),
	})
	.required();

export class FollowUserDTO extends createZodDto(FollowUserSchema) {}
