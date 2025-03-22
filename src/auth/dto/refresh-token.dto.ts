import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const RefreshTokenSchema = z.object({
	refreshToken: z.string({
		required_error: "Refresh Token is required",
	}),
});

export class RefreshTokenDTO extends createZodDto(RefreshTokenSchema) {}
