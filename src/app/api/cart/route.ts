import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = await getTokenAuth(); // هنا بيجيب التوكن الحقيقي من الكوكي
  if (!token) {
    return NextResponse.json({ error: "Unauthorized, login first" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "❌ Product ID is required" }, { status: 400 });
    }

    const res = await fetch(`${process.env.API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: String(token), // دلوقتي هيتبعت التوكن الصح
      },
      body: JSON.stringify({ productId }),
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
