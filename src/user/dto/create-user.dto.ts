import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const CreateUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .regex(
        /^[a-zA-Z0-9_.]{5,15}$/,
        "The username must have alphanumerics characters (uppercase and lowercase words), underscore, dots and it must be between 5 and 15 characters",
      ),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,}$/,
        "Password must have at least 8 characters, one number and one special character.",
      ),
  })
  .required();

export class CreateUserDTO extends createZodDto(CreateUserSchema) {}
