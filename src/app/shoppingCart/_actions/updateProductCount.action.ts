
'use server'
import { getTokenAuth } from "@/utilites/getTokenAuth"


export async function updateCount({productId,count}:{productId:string,count:number}) {
     
     const token = await getTokenAuth()
     console.log("=========",token)
     if(!token)
          throw new Error('Unathourizes  , Login First')
     const res = await fetch(`${process.env.API}/cart/${productId}`,{
          cache:'no-store',
          method:'PUT',
          headers:{
               'Content-type':'application/json',
               token:String(token)
          },
         body:JSON.stringify({count})

     })
     console.log(res)
     const payload  = await res.json()
     return payload
}