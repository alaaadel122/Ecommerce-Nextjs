import * as z from "zod";
 export const addressSchema= z.object({
     details:z.string(),
     phone:z.string(),
     city:z.string()
 })
export type addressSchemaForm = z.infer<typeof addressSchema> 