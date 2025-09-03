import { grtSpecificCategory } from '@/apis/spicificCategory';
import ProductItem from '@/app/product/_components/ProductItem';
import { Category, ProductInterface } from '@/interfaces/product.interface';
import React from 'react'
import { da } from 'zod/v4/locales';

export default async function page({params}:{params:Promise<{id:string}>}) {
  const { id } = await params // id distrct from folder [id] so i can't change the name 
  const data: Category = await grtSpecificCategory(id);
  return (<>
    <h3>{data.name}</h3>
  </>
  )
}
