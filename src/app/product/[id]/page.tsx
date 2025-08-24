import { getSingleProduct } from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from '../_components/ProductDetails';

//SSR comp
export default async function ProductPage({ params }: { params: { id: string } }) {
  const data: ProductInterface = await getSingleProduct(params.id);
  return <ProductDetails prod={data} key={data._id} />;
}

