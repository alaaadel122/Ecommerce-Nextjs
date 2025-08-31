import { grtSpecificCategory } from '@/apis/spicificCategory';
import ProductItem from '@/app/product/_components/ProductItem';
import { Category, ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import { da } from 'zod/v4/locales';

export default async function page(props: any) {
  const { id } = props.params as { id: string }; // id distrct from folder [id] so i can't change the name 
  console.log("page", id)
  const data: Category = await grtSpecificCategory(id);
  console.log(data)
  return (<>
    <h3>{data.name}</h3>
  </>
  )
}
