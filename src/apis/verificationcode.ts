import { codeSchemaForm } from "@/schema/code.schema";

export async function verificationcode(dataForm: codeSchemaForm) {
     try {
          const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(dataForm)
          });
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