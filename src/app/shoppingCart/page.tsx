import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async  function page() {
    const sessionData  = await getServerSession(authOptions)
    console.log(sessionData)
  return (
    <div>page</div>
  )
}
