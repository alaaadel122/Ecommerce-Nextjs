import { grtAllBrands } from '@/apis/brand.api'
import { BrandInterface } from '@/app/brands/typescript/brand.interface';
import React from 'react'
import BrandItem from './_components/BrandItem';

export default async function page() {
  const data: BrandInterface[] = await grtAllBrands();
  
  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
      {data?.map(brand => <BrandItem key={brand._id} brand={brand} />)}
    </div>
  )
}
