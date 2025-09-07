export async function RelatedProducts(categoryId: string) {
     const res = await fetch(`${process.env.API}/products?category[in]=${categoryId}`,
          { cache: 'no-store' }
     )
     const { data } = await res.json()
     return data;
}