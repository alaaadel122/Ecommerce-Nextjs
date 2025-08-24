import { getSingleProduct } from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from '../_components/ProductDetails';

//SSR comp
export default async function Page({ params }: { params: { id: string } }) {
  const { id } =  params  // لازم await هنا
  const data: ProductInterface = await getSingleProduct(id)
  console.log(data)
  return (
    <ProductDetails prod={data} key={data._id}></ProductDetails>
  )
}
