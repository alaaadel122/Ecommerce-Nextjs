'use client'
import Rating from '@/app/_components/Rating'
import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ProductDetails({ prod }: { prod: ProductInterface }) {
     const [activeImage, setActiveImage] = useState(prod?.images[0]) // الصورة الأساسية

     return (
          <div className='flex'>
               <div className="flex flex-col w-[50%] md:flex-row m-5 gap-6">
                    {/* الصورة الرئيسية */}
                    <div className="flex-1">
                         <div className="relative w-full h-[400px] border rounded-lg">
                              <Image
                                   src={activeImage}
                                   alt="Main product image"
                                   fill
                                   className="object-contain rounded-lg"
                              />
                         </div>
                    </div>

                    {/* الصور المصغرة */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto">
                         {prod?.images.map((image, index) => (
                              <div
                                   key={index}
                                   onClick={() => setActiveImage(image)}
                                   className={`relative w-20 h-20 cursor-pointer border rounded-md ${activeImage === image ? 'border-blue-500' : 'border-gray-300'
                                        }`}
                              >
                                   <Image
                                        src={image}
                                        alt={`Thumbnail ${index}`}
                                        fill
                                        className="object-cover rounded-md"
                                   />
                              </div>
                         ))}
                    </div>
               </div>
               <div className=' w-[50%]  m-5 gap-6'>
                    <h3>{prod?.title}</h3>
                    <p className='text-gray-500 py-4'>Category:{prod?.category.name}</p>
                    {prod.priceAfterDiscount ? (
                         <>
                              <span className="text-main text-xl">{prod.priceAfterDiscount} EGP</span>
                              <span className="text-xl line-through text-black ml-2 ">{prod.price} EGP </span>
                         </>
                    ) : (
                         <span className="text-xl text-main">{prod.price} EGP</span>
                    )}
                    <Rating value={prod?.ratingsAverage} /> 
                    <span>Available :  <span className='text-main font-bold'>{prod?.quantity} items in stock</span></span>
                    <p className='text-gray-400'>{prod?.description}</p>
               </div>
          </div>
     )
}
