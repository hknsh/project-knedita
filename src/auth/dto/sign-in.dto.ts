import { passwordSchema, usernameSchema } from "@/common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SignInUserSchema = z.object({
	username: usernameSchema,
	password: passwordSchema,
});

export class SignInUserDTO extends createZodDto(SignInUserSchema) {}
