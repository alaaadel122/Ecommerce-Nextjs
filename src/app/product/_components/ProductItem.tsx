'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import Button from './addToCartBtn'
import Favorite from './WhishIcon'
import Link from 'next/link'
import Image from 'next/image'
import { ProductInterface } from '@/interfaces/product.interface'
import AddToCartBtn from './addToCartBtn'

export default function ProductItem({ prod }: { prod: ProductInterface }) {
     const [ref, inView] = useInView({
          triggerOnce: false,
          threshold: 0.2,
     })
     return (
          <motion.div
               ref={ref}
               initial={{ opacity: 0, y: 50 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, ease: 'easeOut' }}
               className=' w-full sm:w-1/2 md:w-1/5'
          >
               <div className="relative w-full  border border-gray-200 rounded-lg shadow-md overflow-hidden group" >
                    {/* صورة وبيانات المنتج */}
                    <div className="p-5 text-center">
                         <Link href={`/product/${prod._id}`}>
                              <img
                                   width={300}
                                   height={200}
                                   src={prod.imageCover}
                                   alt={prod.title}
                                   className="w-full h-48 object-cover mx-auto rounded-lg"
                              />                    </Link>

                         <span className="text-main mt-2 block">{prod.category.name}</span>
                         <p className="line-clamp-1 mb-8">{prod.title}</p>
                         <div className="font-bold">
                              {prod.priceAfterDiscount ? (
                                   <>
                                        <span className="text-main text-xl">{prod.priceAfterDiscount} EGP</span>
                                        <span className="text-xl line-through text-black ml-2">{prod.price} EGP</span>
                                   </>
                              ) : (
                                   <span className="text-xl text-main">{prod.price} EGP</span>
                              )}
                              <div className="flex items-center justify-center">
                                   {prod.ratingsAverage}
                                   <FontAwesomeIcon icon={faStar} className="text-rating ml-1" />
                              </div>
                              <div className='flex justify-between'>
                                   <AddToCartBtn productId={prod._id} label="Add to cart" />
                                   <Favorite productId={prod._id}></Favorite>
                              </div>
                         </div>
                    </div>


               </div>
          </motion.div>
     )
}
