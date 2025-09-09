'use client'
import { ProductInterface } from '@/interfaces/product.interface'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import WishlistProduct from './WishlistProduct'
import Loading from '@/app/_components/Loading'
import Image from 'next/image'
import wishlistImg from '@/assets/images/empty-wishlist.png'
import { useSession } from 'next-auth/react'
export default function WishList() {
     const { data: session, status } = useSession();

     const { data, isLoading } = useQuery({
          queryKey: ['wishlist'],
          queryFn: async () => {
               const res = await fetch('/api/wishlist', { cache: 'no-store', method: 'GET' })
               if (!res.ok) throw new Error('Failed to fetch wishlist ❌')
               return res.json()
          },
          enabled: !!session,

     })
     if (status === "loading") {
          return <Loading />; // لحد ما session تتحسم
     }

     if (isLoading) {
          return <Loading />
     }
     if (data?.count == 0)
          return <div className='w-full m-auto flex justify-center items-center'>
               <img alt='emptycart' width={400} height={400} src={wishlistImg.src} />
          </div>
     return (
          <div className='flex flex-wrap gap-7 w-[90%] mx-auto justify-center'>
               {data?.data?.map((prod: ProductInterface) => <WishlistProduct key={prod._id} prod={prod} />)}
          </div>
     )
}
