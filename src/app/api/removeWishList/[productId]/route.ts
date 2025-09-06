import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

// هنا نستقبل الـ productId من الـ URL
export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
  const token = await getTokenAuth();
  const { productId } = params;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized, login first" }, { status: 401 });
  }

  try {
    // 🔴 ننده على API الحقيقي بالـ productId
    const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
      method: "DELETE",
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
