
'use server'
import { getTokenAuth } from "@/utilites/getTokenAuth"


export async function deleteProduct(productId:string) {
     
     const token = await getTokenAuth()
     if(!token)
          throw new Error('Unathourizes  , Login First')
     const res = await fetch(`${process.env.API}/cart/${productId}`,{
          cache:'no-store',
          method:'DELETE',
          headers:{
               'Content-type':'application/json',
               token:String(token)
          },

     })
     const payload  = await res.json()
     return payload
}