import { getSingleProduct } from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from '../_components/ProductDetails';
import RelatedProduct from '../_components/RelatedProduct';

//SSR comp
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data: ProductInterface = await getSingleProduct(id);

  return <>
    <ProductDetails prod={data} key={data._id} />;
    <RelatedProduct categoryId={data?.category?._id}/>
  </>

}

