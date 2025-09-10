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

    const payload = await res.json();

    if (!res.ok) {
      // لو السيرفر رجّع message نعرضها
      throw new Error(payload?.message || "❌ Failed to register user");
    }

    return payload;

  } catch (error) {
    console.error("Error in addUser:", error);
    throw error;
  }
}
