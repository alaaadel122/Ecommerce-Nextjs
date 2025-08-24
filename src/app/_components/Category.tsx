import { grtAllCategory } from '@/apis/categories.api'
import React from 'react'

export default async function Category() {
     const categories  = await grtAllCategory()

     
  return (
    <div>Category</div>
  )
}
