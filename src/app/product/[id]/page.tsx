import { getSingleProduct } from '@/apis/singleProduct.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import ProductDetails from '../_components/ProductDetails';

//SSR comp
export default async function ProductPage(props: any) {
  const { id } = props.params as { id: string };
  const data: ProductInterface = await getSingleProduct(id);

  return <ProductDetails prod={data} key={data._id} />;
}

