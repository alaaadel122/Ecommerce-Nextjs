import { grtAllCategory } from '@/apis/categories.api'
import React from 'react'
import CategorySingleItem from './_components/CategorySingleItem'
import { CatergoriesInterface } from '@/interfaces/categories.interface'

const data: CatergoriesInterface[] = await grtAllCategory()
export default async function Page() {

  return (
    <div className='container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
     {
      data.map(category=><CategorySingleItem key={category._id} catergoryId={category._id} category={category}/>)
     }
    </div>
  )
}
