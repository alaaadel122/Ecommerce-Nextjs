'use client'
import { CartProduct, Product } from '@/interfaces/cartProducts.interface'
import { ProductInterface } from '@/interfaces/product.interface'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

export default function Cart() {
     const { data, isLoading, isError } = useQuery({
          queryKey: ['cart'], queryFn: async () => {
               const res = await fetch('/api/cart')
               const paylod = await res.json()
               return paylod
          }
     })
     console.log(data)
     return (
          <div className='container mx-auto py-5'>
               <h2>Total Cart Price : <span className='text-main text-2xl'>{data?.data.totalCartPrice}EGP</span> </h2>
               <h3>Number of Cart items : <span className='text-main text-2xl'>{data?.numOfCartItems}</span></h3>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                   <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                   </th>
                                   <th scope="col" className="px-6 py-3">
                                        Product
                                   </th>
                                   <th scope="col" className="px-6 py-3">
                                        Qty
                                   </th>
                                   <th scope="col" className="px-6 py-3">
                                        Price
                                   </th>
                                   <th scope="col" className="px-6 py-3">
                                        Action
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {data?.data.products.map((prod:CartProduct) => <ProductItemTable key={prod._id} prod={prod}></ProductItemTable>)}

                         </tbody>
                    </table>
               </div>
          </div>

     )
}

function ProductItemTable({ prod }: { prod: CartProduct  }) {
     return (

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                    <Image src={prod.product.imageCover} width={100} height={100} alt="Apple Watch" />
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.product.title}
               </td>
               <td className="px-6 py-4">
                    <div className="flex items-center">
                         <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                              </svg>
                         </button>
                         <div>
                              <span className=''>{prod.count}</span>
                         </div>
                         <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                         </button>
                    </div>
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.price }     EGP
               </td>
               <td className="px-6 py-4">
                    <i className='fa-solid fa-trash text-red-800'></i>
               </td>
          </tr>)
}