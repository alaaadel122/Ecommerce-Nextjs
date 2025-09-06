'use client'
import { ProductInterface } from '@/interfaces/product.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import WishlistProduct from './WishlistProduct'

export default function WishList() {
     const { data } = useQuery({
          queryKey: ['wishlist'],
          queryFn: async () => {
               const res = await fetch('/api/wishlist', { cache: 'no-store', method: 'GET' })
               if (!res.ok) throw new Error('Failed to fetch wishlist ❌')
               return res.json()
          }
     })
     return (
          <div className='flex flex-wrap gap-7 w-[90%] mx-auto justify-center'>
               {data?.data?.map((prod :ProductInterface )=> <WishlistProduct key={prod._id} prod={prod} />)}
          </div>
     )
}
