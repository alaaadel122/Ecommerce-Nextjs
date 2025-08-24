'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'
import Image from 'next/image';



// استيراد استايلات Swiperimport 'swiper/css'

export default function MainSlider() {
  return (
    <div className='md:flex hidden'>
      <div className='w-3/4'>
        <Swiper
          modules={[Autoplay]} // 👈 ضفنا الموديول
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500, // المدة بين السلايدات
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Image src={slider1} alt="slider1" className='w-full h-[400px] object-cover'/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={slider2} alt="slider2" className='w-full h-[400px] object-cover' />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={slider3} alt="slider3"  className='w-full h-[400px] object-cover'/>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='w-1/4 flex flex-col '>
        <Image src={blog1} alt="blog1" className='h-[200px] object-cover'/>
        <Image src={blog2} alt="blog2"  className='h-[200px] object-cover'/>
      </div>
    </div>
  )
}
