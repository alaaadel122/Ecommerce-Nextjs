'use client'
import Loading from '@/app/_components/Loading'
import { CartProduct, Product } from '@/app/shoppingCart/typescript/cartProducts.interface'
import { ProductInterface } from '@/interfaces/product.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import cartImage from '@/assets/images/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg'
import { toast } from 'react-toastify'
import { deleteProduct } from '../_actions/deleteProduct.action'
import ClearBtn from './ClearBtn'
import { updateCount } from '../_actions/updateProductCount.action'
export default function Cart() {
     const { data, isLoading, isError } = useQuery({
          queryKey: ['cart'], queryFn: async () => {
               const res = await fetch('/api/cart', { cache: 'no-store', method: 'GET' });
               if (!res.ok) throw new Error('Failed to fetch cart');
               return res.json();
          }
     })
     if (isLoading) {
          return <Loading />
     }
     if (data?.numOfCartItems == 0)
          return <div className='w-full m-auto flex justify-center items-center'>
               <img alt='emptycart' width={700} height={700} src={cartImage.src} />
          </div>

     return (

          <div className='container   mx-auto py-5'>
               <div className='flex justify-between w-[80%] mx-auto'>
                    <div>
                         <h2>Total Cart Price : <span className='text-main text-2xl'>{data?.data.totalCartPrice}EGP</span> </h2>
                         <h3>Number of Cart items : <span className='text-main text-2xl'>{data?.numOfCartItems}</span></h3>
                    </div>
                    <div className='mt-5'>
                         <ClearBtn />
                    </div>
               </div>
               <div className="relative w-[80%] mx-auto mt-5 overflow-x-auto shadow-md sm:rounded-lg">
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
                              {data?.data?.products?.map((prod: CartProduct) => <ProductItemTable key={prod._id} prod={prod}></ProductItemTable>)}

                         </tbody>
                    </table>
               </div>
               <div className='ml-35 mt-10'>
                    <button className='btn bg-main text-white min-w-[50px] md:min-w-[150px]' >
                         <Link href={`/checkout/${data?.cartId}`} >
                              CheckOut
                         </Link>
                    </button>
               </div>
          </div>

     )
}

function ProductItemTable({ prod }: { prod: CartProduct }) {
     const queryClient = useQueryClient()
     const { mutate, isPending, data } = useMutation({
          mutationFn: deleteProduct,
          onSuccess: (data) => {
               toast.success("Product Deleted")
               queryClient.invalidateQueries({ queryKey: ['cart'] })

          },
          onError: () => {
               toast.error('Login First')
          }
     })
     const [pendingType, setPendingType] = useState<null | 'inc' | 'dec'>(null);
     const { mutate: updateMutate, isPending: updatePending } = useMutation({
          mutationFn: updateCount,
          onMutate: (variables) => {
               setPendingType(variables.count > prod.count ? 'inc' : 'dec');
          },
          onSettled: () => {
               setPendingType(null);
          },
          onError: () => {
               toast.error('Login First')
          },
          onSuccess: (data) => {
               toast.success('Cart is Updated succussfully')
               queryClient.invalidateQueries({ queryKey: ['cart'] })
          }
     })
     function handleIncrease() {
          prod.count < prod.product.quantity ? updateMutate({ productId: prod.product._id, count: prod.count + 1 }) : 'Not Avilable'
     }
     function handleDecrease() {
          prod.count > 1 ? updateMutate({ productId: prod.product._id, count: prod.count - 1 }) : mutate(prod.product._id)
     }

     return (

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                    <Link href={`/product/${prod.product._id}`}>
                         <img src={prod.product.imageCover} width={100} height={100} alt="Apple Watch" />
                    </Link>
               </td>
               <td className=" py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.product.title}
               </td>
               <td className="px-6 py-4">
                    <div className="flex items-center">
                         <button onClick={handleDecrease} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <span className="sr-only">Quantity button</span>
                              {updatePending && pendingType === 'dec' ? (
                                   <i className='fa-solid fa-spinner fa-spin'></i>
                              ) : (
                                   <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                   </svg>
                              )}
                         </button>
                         <div>
                              <span className=''>{prod.count}</span>
                         </div>
                         <button onClick={handleIncrease} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              {updatePending && pendingType === 'inc' ? (
                                   <i className='fa-solid fa-spinner fa-spin'></i>
                              ) : (
                                   <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                   </svg>
                              )}
                         </button>
                    </div>
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.price}     EGP
               </td>
               <td className="px-6 py-4">
                    <span onClick={() => mutate(prod.product._id)} className='text-xl'>
                         {isPending ? <i className='fa-solid fa-spin fa-spinner text-red-700'></i> : <i className='fa-solid fa-trash text-red-800'></i>}
                    </span>
               </td>
          </tr>)
}