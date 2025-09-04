import React from 'react'
import { getUserOrders } from './_actions/getUserOrder.action'
import { Product, singleOrder } from './interfaces/allOrders.interface'

export default async function page() {
     const data: singleOrder[] = await getUserOrders()
     console.log("comp", data)
     return (
          <div>
               {data?.map(order => (
                    <div key={order._id}>
                         {/* مثال: عرض عناصر الطلب */}
                         <div>Order ID: {order._id}</div>
                         <div>Cart Items: {order.cartItems?.length}
                              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

                                        </tbody>
                                   </table>
                              </div>


                         </div>
                         <ul>
                              {order.cartItems?.map(item => (
                                   <li key={item._id}>
                                        {/* عرض اسم المنتج وصورة المنتج */}
                                        <div>Product Name: {item.product?.title}</div>
                                        <div>
                                             {item.product?.imageCover && (
                                                  <img src={item.product.imageCover} alt={item.product.title} width={80} />
                                             )}
                                        </div>
                                        <div>Quantity: {item.count}</div>
                                   </li>
                              ))}
                         </ul>
                    </div>
               ))}
          </div>
     )
}
function RenderTableRow(product:Product) {
     return (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                    <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
               </td>
               <td className="px-6 py-4">
                    <div className="flex items-center">

                         <div>
                              <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></span>
                         </div>
                    </div>
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
               </td>
               <td className="px-6 py-4">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
               </td>
          </tr>
     )
}