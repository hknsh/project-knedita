import { z } from "zod";

export const passwordSchema = z
	.string({ required_error: "Password is required" })
	.min(8, "Password must be at least 8 characters long")
	.max(32, "Password cannot exceed 32 characters")
	.regex(/\d/, "Password must contain at least one digit")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
	.transform((value) => value.replace(/\s+/g, ""));

export const usernameSchema = z
	.string({ required_error: "Username is required" })
	.regex(
		/^[a-zA-Z0-9_.]{5,15}$/,
		"The username must have alphanumeric characters, underscores, dots and must be between 5 and 15 characters",
	)
	.toLowerCase();

export const emailSchema = z
	.string({ required_error: "Email is required" })
	.email("Invalid email");
