import { addProduct } from "@/app/shoppingCart/_actions/addProduct.action"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
     const { productId } = await req.json()
     const res = await addProduct(productId)
     return NextResponse.json(res)
}