import React from 'react'
import { BounceLoader } from "react-spinners";
export default function Loading() {
     return (
          <div className='flex justify-center items-center min-h-[80vh]'>
               <BounceLoader color="#0aad0a" size={50} />
          </div>
     )
}
