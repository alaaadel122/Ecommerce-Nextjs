'use client'
import Link from 'next/link'
import React from 'react'
     ;
import ShoppingCart from './ShoppingCart';
import logo from '@/assets/images/freshcart-logo.svg'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
     const { data: session, status } = useSession()

     const links = [
          { path: '/', element: "home" },
          { path: '/product', element: "product" },
          { path: '/category', element: "category" },
          { path: '/brands', element: "brands" },

     ]
     return (
          <nav className="bg-light w-full border-gray-200 dark:bg-gray-900">
               <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                         <Image
                              src={logo}
                              width={120}
                              height={120}
                              alt="Picture of the author"
                         />
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                         <span className="sr-only">Open main menu</span>
                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                         </svg>
                    </button>
                    <div className="hidden w-full md:flex justify-center md:w-auto" id="navbar-default">
                         <ul className="font-medium flex flex-col  p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                              {links.map(link =>
                                   <li key={link.path}>
                                        <Link href={link.path} className="block py-2 px-3 text-gray-500  rounded-sm md:bg-transparent  md:p-0 dark:text-white md:dark:text-main" aria-current="page">{link.element.toUpperCase()}</Link>
                                   </li>
                              )}
                         </ul>
                    </div>
                    <div className='flex '>
                         {session?.user.name ? <> <Link href={'/'}><p className='pt-3'> {session.user.name.toUpperCase()}</p> </Link> <button className='btn btn-danger rounded-2xl' onClick={async () => {
                              // Optional: Clear custom cookies here if needed
                              await signOut({ callbackUrl: '/' });
                         }}> Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i> </button></> :
                              <Link href={'/auth/login'} className="block py-2 px-3 text-gray-500  rounded-sm md:bg-transparent  md:mr-1 dark:text-white md:dark:text-main" aria-current="page">
                                   <i className='fa-solid fa-user fa-xl'></i>
                              </Link>

                         }
                         <Link href={'/shoppingCart'} className="block relative py-2 px-3 text-gray-500  rounded-sm md:bg-transparent  md:mr-1 dark:text-white md:dark:text-main" aria-current="page">
                              <ShoppingCart />
                         </Link>
                    </div>
               </div>
          </nav>

     )
}
