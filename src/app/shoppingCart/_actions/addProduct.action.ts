
'use server'
import { getTokenAuth } from "@/utilites/getTokenAuth"


export async function addProduct(productId:string) {
     
     const token = await getTokenAuth()
     console.log("=========",token)
     if(!token)
          throw new Error('Unathourizes  , Login First')
     const res = await fetch(`${process.env.API}/cart`,{
          cache:'no-store',
          method:'POST',
          headers:{
               'Content-type':'application/json',
               token:String(token)
          },
          body:JSON.stringify({productId})

     })
     console.log(res)
     const payload  = await res.json()
     return payload
}