'use server'
import { addressSchemaForm } from "@/schema/address.schema";
import { getTokenAuth } from "@/utilites/getTokenAuth";
type shippingAddressType ={
     "details":string,
     "phone":string,
     "city":string
}
export async function checkoutOnline(cartId: string , url=process.env.NEXT_URL, shippingAddress: shippingAddressType) {
     const token = await getTokenAuth();
     if (!token)
          throw new Error('Unauthorized ,Login first')
     const res = await fetch(`${process.env.API}/orders/checkout-session/${cartId}?url=${url}`, {
          cache: 'no-store',
          method: 'POST',
          headers: {
               'Content-type': 'application/json',
               token: String(token)
          },
          body: JSON.stringify({
               shippingAddress
          })
     })
     const data = await res.json()
     console.log(data)
     return data
}