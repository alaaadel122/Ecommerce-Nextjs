'use client'
import Rating from '@/app/_components/Rating'
import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './addToCartBtn'
import Favorite from './Favorite'
import AddToCartBtn from './addToCartBtn'

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
                    <div className="flex items-center">
                         <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>
                         </button>
                         <div>
                              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={1} />
                         </div>
                         <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                         </button>
                    </div>
                    <div className='flex'>
                    <AddToCartBtn productId={prod._id}></AddToCartBtn>
                    <Favorite></Favorite>
                    </div>
               </div>
          </div>
     )
}
