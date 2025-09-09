import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
     const token = await getTokenAuth()
          console.log("=========",token)
  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "❌ Product ID is required" }, { status: 400 });
    }

    // جرب تنادي API بتاعك
    const res = await fetch(`${process.env.API}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         token: String(token)
      },
      body: JSON.stringify({ productId })
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
