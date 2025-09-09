'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/blog-img-2.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'



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
            <img src={slider1.src} alt="slider1" className='w-full h-[400px] object-cover'/>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2.src} alt="slider2" className='w-full h-[400px] object-cover' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3.src} alt="slider3"  className='w-full h-[400px] object-cover'/>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className='w-1/4 flex flex-col '>
        <img src={blog1.src} alt="blog1" className='h-[200px] object-cover'/>
        <img src={blog2.src} alt="blog2"  className='h-[200px] object-cover'/>
      </div>
    </div>
  )
}
