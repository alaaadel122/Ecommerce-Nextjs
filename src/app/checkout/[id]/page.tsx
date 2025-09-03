import React from 'react'
import CheckoutComp from '../_component/CheckoutComp'

export default  async function page({params}:{params:Promise<{id:string}>}) {
     const {id} = await params

  return (
     <CheckoutComp cartId={id}></CheckoutComp>
)
}
