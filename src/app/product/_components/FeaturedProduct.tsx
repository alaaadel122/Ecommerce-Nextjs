import { grtProducts } from '@/apis/products.api'
import { ProductInterface } from '@/interfaces/product.interface'
import React from 'react'
import ProductItem from './ProductItem'

export default async function FeaturedProduct() {
     const data:ProductInterface[] = await grtProducts()
    //  console.log(data)
  return (
    <div className='flex flex-wrap container mx-auto gap-y-3 gap-x-6 justify-center items-start mt-5'>
     {data.map((prod:ProductInterface)=><ProductItem key={prod._id} prod={prod}></ProductItem>)}
    </div>
  )
}
