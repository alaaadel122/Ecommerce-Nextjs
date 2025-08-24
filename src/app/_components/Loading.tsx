import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Loading() {
     return (
          <Oval
               visible={true}
               height="80"
               width="80"
               color="#0aad0a"
               ariaLabel="oval-loading"
               wrapperStyle={{}}
               wrapperClass=""
               secondaryColor="#f0f3f2"
          />
     )
}
