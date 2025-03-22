import {
	emailSchema,
	passwordSchema,
	usernameSchema,
} from "@/common/shared/common.schema";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const SignUpUserSchema = z.object({
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
});

export class SignUpUserDTO extends createZodDto(SignUpUserSchema) {}
