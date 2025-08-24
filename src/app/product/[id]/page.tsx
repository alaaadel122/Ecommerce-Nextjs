import { getSingleProduct } from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from '../_components/ProductDetails';

//SSR comp
interface ProductPageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: ProductPageProps) {
  const { id } =  params  // لازم await هنا
  const data: ProductInterface = await getSingleProduct(id)
  console.log(data)
  return (
    <ProductDetails prod={data} key={data._id}></ProductDetails>
  )
}
