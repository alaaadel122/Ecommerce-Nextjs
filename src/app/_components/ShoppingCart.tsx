import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from '@tanstack/react-query';

export default function ShoppingCart() {
     const { data, isLoading, isError } = useQuery({
          queryKey: ['cart'], queryFn: async () => {
               const res = await fetch('/api/cart');
               if (!res.ok) throw new Error('Failed to fetch cart');
               return res.json();
          }
     })
     return (
          <div>
               <i  className='relative fa-solid fa-cart-shopping fa-xl' ></i>
               <div className='absolute top-0 right-1 size-5 flex justify-center items-center bg-main rounded-full '>
                    <span className='text-light cart-counter'>{data?.numOfCartItems}</span>
               </div>

          </div>
     )
}
