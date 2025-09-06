import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
     const token = await getTokenAuth()
          console.log("=========",token)
  try {
   // جرب تنادي API بتاعك
    const res = await fetch(`${process.env.API}/wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         token: String(token)
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`External API failed: ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err: any) {
    console.error("API ERROR 🚨:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
