import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

// TODO: Add posts, liked_posts, liked_comments, followers, following, post_comments and notifications field

export const UserSchema = z
  .object({
    id: z.string().uuid(),
    displayName: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.password(),
    profileImage: z.string().url(),
    createdAt: z.date(),
  })
  .required();

export class UserModel extends createZodDto(UserSchema) {}
