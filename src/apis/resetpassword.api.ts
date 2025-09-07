import { codeSchemaForm } from "@/schema/code.schema";
import { resetPasswordSchemaForm } from "@/schema/resetpassword.schema";

export async function restpassword(dataForm: resetPasswordSchemaForm) {
     try {
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
               method: "PUT",
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