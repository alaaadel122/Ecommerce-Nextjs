'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ShoppingCart from './ShoppingCart';
import logo from '@/assets/images/freshcart-logo.svg'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
     const { data: session } = useSession()
     const [menuOpen, setMenuOpen] = useState(false);

     const links = [
          { path: '/', element: "home" },
          { path: '/product', element: "product" },
          { path: '/category', element: "category" },
          { path: '/brands', element: "brands" },
          {path:'/whishlist',element:'wishlist'}
     ]

     return (
          <nav className="bg-light w-full fixed top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900">
               <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                         <Image
                              src={logo}
                              width={120}
                              height={120}
                              alt="Picture of the author"
                         />
                    </Link>
                    {/* Hamburger menu for small screens */}
                    <button
                         className="md:hidden p-2 text-gray-700"
                         onClick={() => setMenuOpen(!menuOpen)}
                         aria-label="Open menu"
                    >
                         <i className="fa-solid fa-bars fa-xl"></i>
                    </button>
                    {/* Links and user/cart for medium+ screens */}
                    <div className="hidden md:flex flex-1  md:justify-center">
                         <ul className="font-medium flex flex-row space-x-8 rtl:space-x-reverse">
                              {links.map(link =>
                                   <li key={link.path}>
                                        <Link href={link.path} className="block py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-main" aria-current="page">
                                             {link.element.toUpperCase()}
                                        </Link>
                                   </li>
                              )}
                         </ul>
                    </div>
                    <div className='hidden md:flex items-center'>
                         {session?.user.name ? (
                              <>
                                   <Link href={'/'}><p className='pt-3'> HI  {session.user.name.toUpperCase()}</p> </Link>
                                   <button className='pt-2 pl-2 text-main' onClick={async () => {
                                        await signOut({ callbackUrl: '/' });
                                   }}>
                                        Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                   </button>
                              </>
                         ) : (
                              <Link href={'/auth/login'} className="block py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:mr-1 dark:text-white md:dark:text-main" aria-current="page">
                                   <i className='fa-solid fa-user fa-xl'></i>
                              </Link>
                         )}
                         <Link href={'/shoppingCart'} className="block relative py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:mr-1 dark:text-white md:dark:text-main" aria-current="page">
                              <ShoppingCart />
                         </Link>
                    </div>
               </div>
               {/* Mobile menu */}
               {menuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
                         <ul className="flex flex-col  py-4 space-y-2">
                              <li>
                                   {session?.user.name ? (
                                        <div className='flex justify-center w-full'>
                                             <p className='pt-3 text-center min-w-[50%]'>HI {session.user.name.toUpperCase()}</p>
                                             <button className='pt-2 pl-2 text-main min-w-[50%] text-left' onClick={async () => {
                                                  setMenuOpen(false);
                                                  await signOut({ callbackUrl: '/' });
                                             }}>
                                                  Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                             </button>
                                        </div>
                                   ) : (
                                        <Link href={'/auth/login'} className="block py-2  px-4 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMenuOpen(false)}>
                                             <i className='fa-solid fa-user fa-xl'></i> Login
                                        </Link>
                                   )}
                              </li>
                              {links.map(link =>
                                   <li key={link.path}>
                                        <Link
                                             href={link.path}
                                             className="block py-2 px-4 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                             onClick={() => setMenuOpen(false)}
                                        >
                                             {link.element.toUpperCase()}
                                        </Link>
                                   </li>
                              )}

                              <li>
                                   <Link href={'/shoppingCart'} className="block py-2 px-4 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMenuOpen(false)}>
                                        <ShoppingCart />
                                   </Link>
                              </li>
                         </ul>
                    </div>
               )}
          </nav>
     )
}