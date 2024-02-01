import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const CreateKweekSchema = z
  .object({
    content: z.string({ required_error: "Kweek content is required" }).max(300),
    files: z.array(z.object({})),
  })
  .required();

export class CreateKweekDTO extends createZodDto(CreateKweekSchema) {}
