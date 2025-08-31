export async function grtSpecificCategory(categoryId:string){
     const res   = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,

          {cache:'no-store'}
     )
     const {data} = await res.json()
     return data;
}