import { grtAllCategory } from '@/apis/categories.api'
import React from 'react'
import CategorySingleItem from './CategorySingleItem'
import { CatergoriesInterface } from '@/interfaces/categories.interface'

export default async function CategorySlider() {
     const data: CatergoriesInterface[] = await grtAllCategory()
     return (
          <div className='container'>
               <h3 className="text-gray-700 text-2xl after:ml-0.5 before:text-main before:content-['|'] my-5">Category</h3>
               <div className="overflow-x-auto ">
                    <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-hidden">
                         {data?.map(category =>
                              <CategorySingleItem key={category._id} category={category} catergoryId = {category._id} />
                         )}
                    </div>
               </div>
          </div>
     )
}
