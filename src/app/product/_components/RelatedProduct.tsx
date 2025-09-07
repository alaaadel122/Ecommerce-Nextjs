import { RelatedProducts } from '@/apis/relatedProduct'
import { ProductInterface } from '@/interfaces/product.interface'
import React from 'react'
import ProductItem from './ProductItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default async function RelatedProduct({ categoryId }: { categoryId: string }) {
     const data = await RelatedProducts(categoryId)
     return (
          <div className='container mx-auto'>
               <h3 className="text-gray-700 text-2xl after:ml-0.5 before:text-main before:content-['|'] my-5">Products related to this item</h3>
               
               <div className='flex flex-wrap  gap-y-3 gap-x-3 justify-center items-start mt-5'>

                    {data?.map((prod: ProductInterface) => <ProductItem prod={prod} key={prod._id} />)}
               </div>
          </div>
     )
}
