export async function grtAllBrands(){
     const res   = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,

          {cache:'no-store'}
     )
     const {data} = await res.json()
     return data;
}