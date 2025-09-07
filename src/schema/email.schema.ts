import * as z from "zod";
 export const emailSchema= z.object({
     email:z.string().nonempty('This feild is required').email('Not Valid Email'),
 })
export type emailSchemaForm = z.infer<typeof emailSchema> 