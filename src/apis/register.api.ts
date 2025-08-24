import { registerSchemaForm } from "@/schema/register.schema"

export async function addUser(dataForm: registerSchemaForm) {
     try {
          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(dataForm)
          });

          if (!res.ok) {
               throw new Error("Failed to register user");
          }

          const payload = await res.json();
          return payload;
     } catch (error) {
          console.error("Error in addUser:", error);
          throw error;
     }
}