import { emailSchemaForm } from "@/schema/email.schema";

export async function forgetpassword(dataForm: emailSchemaForm) {
     try {
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(dataForm)
          });
          console.log(res)
          if (!res.ok) {
               throw new Error("Failed to send verification code !");
          }

          const payload = await res.json();
          return payload;
     } catch (error) {
          console.error("Error:", error);
          throw error;
     }
}