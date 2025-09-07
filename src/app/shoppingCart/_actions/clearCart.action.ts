'use server'
import { getTokenAuth } from "@/utilites/getTokenAuth";

export async function ClearCart() {
     const token = await getTokenAuth();
     if (!token)
          throw new Error('Unathourizes  , Login First')
     const res = await fetch(`${process.env.API}/cart`, {
          cache: 'no-store',
          method: 'DELETE',
          headers: {
               'Content-type': 'application/json',
               token: String(token)
          },
     })
     const payload  = await res.json()
     return payload;
}