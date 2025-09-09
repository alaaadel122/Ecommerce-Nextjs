'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ShoppingCart from './ShoppingCart';
import logo from '../../assets/images/freshcart-logo.svg'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { path: '/', element: "home" },
    { path: '/product', element: "product" },
    { path: '/category', element: "category" },
    { path: '/brands', element: "brands" },
  ]

  const authorizeLinks = [
    { path: '/whishlist', element: 'wishlist' },
    { path: '/allorders', element: 'all orders' }
  ]

  // لو فيه يوزر، ضيف الـ authorizeLinks على باقي اللينكات
  const navLinks = session?.user ? [...links, ...authorizeLinks] : links;

  return (
    <nav className="bg-light w-full fixed top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} width={120} height={120} alt="Freshcart logo" />
        </Link>

        {/* Hamburger menu */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <i className="fa-solid fa-bars fa-xl"></i>
        </button>

        {/* Links for medium+ screens */}
        <div className="hidden md:flex flex-1 md:justify-center">
          <ul className="font-medium flex flex-row space-x-8 rtl:space-x-reverse">
            {navLinks.map(link =>
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${pathname === link.path ? "text-main font-bold" : "text-gray-500"} block py-2  rounded-sm`}
                >
                  {link.element.toUpperCase()}
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right side: login/logout + cart */}
        <div className='hidden md:flex items-center'>
          {session?.user?.name ? (
            <>
              <Link href={'/'}><p className='pt-3'> HI {session.user.name.toUpperCase()}</p></Link>
              <button
                className='pt-2 pl-2 text-main'
                onClick={async () => { await signOut({ callbackUrl: '/' }); }}
              >
                Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </>
          ) : (
            <Link href={'/auth/login'} className="block py-2 px-3 text-gray-500 rounded-sm md:mr-1">
              <i className='fa-solid fa-user fa-xl'></i>
            </Link>
          )}
          <Link href={'/shoppingCart'} className="block relative py-2 px-3 text-gray-500 rounded-sm md:mr-1">
            <ShoppingCart />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
          <ul className="flex flex-col py-4 space-y-2">
            {session?.user?.name ? (
              <li className='flex justify-between px-4'>
                <p className='pt-3'>HI {session.user.name.toUpperCase()}</p>
                <button className='pt-2 pl-2 text-main' onClick={async () => {
                  setMenuOpen(false);
                  await signOut({ callbackUrl: '/' });
                }}>
                  Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </li>
            ) : (
              <li>
                <Link href={'/auth/login'} className="block py-2 px-4 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={() => setMenuOpen(false)}>
                  <i className='fa-solid fa-user fa-xl'></i> Login
                </Link>
              </li>
            )}

            {navLinks.map(link =>
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
