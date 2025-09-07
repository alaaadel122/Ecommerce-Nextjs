import * as z from "zod";
 export const resetPasswordSchema= z.object({
     email:z.string().nonempty('This feild is required').email('Not Valid Email'),
     newPassword:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,'Not Valid Password'),
 })
export type resetPasswordSchemaForm = z.infer<typeof resetPasswordSchema> 