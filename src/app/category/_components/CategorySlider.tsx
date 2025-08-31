import { grtAllCategory } from '@/apis/categories.api'
import { CatergoriesInterface } from '@/app/category/typescript/categories.interface'
import React from 'react'
import CategorySingleItem from './CategorySingleItem'

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
