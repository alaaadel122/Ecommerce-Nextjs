// schema/code.schema.ts
import { z } from "zod";

export const codeSchema = z.object({
  resetCode: z.string()
    .min(4, "Code must be at least 4 characters")
    .max(8, "Code must be at most 8 characters")
});

export type codeSchemaForm = z.infer<typeof codeSchema>;
