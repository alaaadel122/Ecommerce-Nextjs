import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingCart() {
     return (
          <div>
               <FontAwesomeIcon icon={faShoppingCart} size="xl" className='relative' />
               <div className='absolute top-0 right-1 size-5 flex justify-center items-center bg-main rounded-full '>
                    <span className='text-light cart-counter'>3</span>
               </div>

          </div>
     )
}
