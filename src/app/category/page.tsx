import { grtAllCategory } from '@/apis/categories.api'
import { CatergoriesInterface } from '@/interfaces/categories.interface'
import React from 'react'
import CategorySingleItem from './_components/CategorySingleItem'
import Category from '../_components/Category'

const data: CatergoriesInterface[] = await grtAllCategory()
console.log("Categories:", data) // ده هيبان في Server Logs
export default async function Page() {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
     {
      data.map(category=><CategorySingleItem key={category._id} category={category}/>)
     }
    </div>
  )
}
