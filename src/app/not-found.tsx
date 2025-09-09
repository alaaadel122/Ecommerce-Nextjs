import React from 'react'
import errorImg from '../assets/images/404.png'
import Image from 'next/image'
export default function NotFound() {
  return (
    <div>
     <Image src={errorImg} width={400} height={400} alt='error image'/>
    </div>
  )
}

