import * as z from "zod";
 export const registerSchema= z.object({
     name:z.string().nonempty('This feild is required').min(2,'Min length is 2').max(10,'Max length is 10'),
     email:z.string().nonempty('This feild is required').email('Not Valid Email'),
     password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Not Valid Password'),
     rePassword:z.string().nonempty('This field is Required'),
     phone:z.string()
 }).refine((data)=>data.password == data.rePassword,{
     path:['rePassword'],
     message:'Not Match Password'
 })
export type registerSchemaForm = z.infer<typeof registerSchema> 
//.regex(/(002)^(01)[0-25]\d{8}$/)