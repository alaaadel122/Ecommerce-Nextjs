import * as z from "zod";
 export const loginSchema= z.object({
     email:z.string().nonempty('This feild is required').email('Not Valid Email'),
     password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Not Valid Password'),
 })
export type loginSchemaForm = z.infer<typeof loginSchema> 