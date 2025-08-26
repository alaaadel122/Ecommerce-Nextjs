// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
// import { NextResponse } from 'next/server'

import Cart from "./_component/Cart";



export default async  function page() {
   
  return (
    <div><Cart></Cart></div>
  )
}
