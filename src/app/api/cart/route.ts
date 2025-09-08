import { getTokenAuth } from "@/utilites/getTokenAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getTokenAuth();
  if (!token) {
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  const res = await fetch(`${process.env.API}/cart`, {
    cache: "no-store",
    headers: { token },
  });

  const payload = await res.json();
  return NextResponse.json(payload);
}
