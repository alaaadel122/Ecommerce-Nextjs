'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { ProductInterface } from '@/interfaces/product.interface'
import AddToCartBtn from '@/app/product/_components/addToCartBtn'
import Favorite from '@/app/product/_components/WhishIcon'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function WishlistProduct({ prod }: { prod: ProductInterface }) {
     const [ref, inView] = useInView({
          triggerOnce: false,
          threshold: 0.2,
     })
     const queryClient = useQueryClient()

     const { mutate: removeFromWishlist } = useMutation({
          mutationFn: async (id: string) => {
               const res = await fetch(`/api/removeWishList/${id}`, { method: 'DELETE' })
               if (!res.ok) throw new Error('Failed to remove from wishlist ❌')
               return res.json()
          },
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['wishlist'] })
          }
     })

     // ✅ callback عند نجاح الإضافة للكارت
     const handleAddToCartSuccess = () => {
          removeFromWishlist(prod._id) // يشيل من الـ wishlist بعد ما يتضاف للكارت
     }
     return (
          <motion.div
               ref={ref}
               initial={{ opacity: 0, y: 50 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, ease: 'easeOut' }}
               className="w-full"
          >
               <div className="flex flex-col md:flex-row max-w-sm md:max-w-full mx-auto items-center md:items-start justify-between gap-6 border border-gray-200 rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition">

                    {/* صورة المنتج */}
                    <div className="flex-shrink-0 text-center">
                         <Image
                              width={120}
                              height={120}
                              src={prod.imageCover}
                              alt={prod.title}
                              className="w-28 h-28 object-cover rounded-lg"
                         />
                    </div>

                    {/* بيانات المنتج */}
                    <div className="flex-1 text-center md:text-left w-full">
                         <span className="text-main font-semibold block mb-1">{prod.category.name}</span>
                         <h3 className="line-clamp-2 font-medium text-lg mb-2">{prod.title}</h3>

                         {/* السعر */}
                         <div className="mb-2 ">
                              {prod.priceAfterDiscount ? (
                                   <>
                                        <span className="text-main text-lg font-bold">{prod.priceAfterDiscount} EGP</span>
                                        <span className="text-gray-500 line-through text-base ml-2">{prod.price} EGP</span>
                                   </>
                              ) : (
                                   <span className="text-main text-lg font-bold">{prod.price} EGP</span>
                              )}
                         </div>

                         {/* التقييم */}
                         <div className="flex items-center justify-center md:justify-start text-sm text-gray-600 mb-3">
                              {prod.ratingsAverage}
                              <FontAwesomeIcon icon={faStar} className="text-yellow-500 ml-1" />
                         </div>

                         {/* الأزرار في الشاشات الصغيرة */}
                         <div className="flex flex-row justify-center gap-3 items-center mt-3 md:hidden">
                              <AddToCartBtn productId={prod._id} onSuccess={handleAddToCartSuccess}  label="Move to cart" />
                              <Favorite productId={prod._id} />
                         </div>
                    </div>

                    {/* الأزرار في الشاشات الكبيرة */}
                    <div className="hidden md:flex flex-row gap-3 items-center">
                         <AddToCartBtn productId={prod._id} onSuccess={handleAddToCartSuccess} label="Move to cart"/>
                         <Favorite productId={prod._id} />
                    </div>
               </div>
          </motion.div>
     )
}
