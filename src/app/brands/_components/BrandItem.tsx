import { BrandInterface } from '@/app/brands/typescript/brand.interface'
import Image from 'next/image'
import React from 'react'

export default function BrandItem({brand}:{brand:BrandInterface}) {
     
  return (
    <div className=''>
     <div className='mx-auto flex justify-center border-1 border-gray-300  relative overflow-hidden'>
          <Image src={brand.image} width={150} height={150} alt="brand" className='object-contain'/>
     </div>
    </div>
  )
}
