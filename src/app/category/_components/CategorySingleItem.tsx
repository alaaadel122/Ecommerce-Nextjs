import { CatergoriesInterface } from '@/interfaces/categories.interface'
import Image from 'next/image'
import React from 'react'

export default function CategorySingleItem({ category }: { category: CatergoriesInterface }) {
     return (
          <div className="flex items-center gap-4 bg-white shadow rounded-xl p-4 min-w-[200px]">
               <Image
                    src={category.image}
                    alt="Phone"
                    className="w-16 h-16 object-cover rounded-lg"
                    width={50}
                    height={50}
               />
               <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    
               </div>
          </div>



     )
}
