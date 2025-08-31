export async function grtAllCategory(){
     const res   = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,

          {cache:'no-store'}
     )
     const {data} = await res.json()
     return data;
}