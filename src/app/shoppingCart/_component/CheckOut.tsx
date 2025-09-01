'use client'
import React from 'react'
import { ClearCart } from '../_actions/clearCart.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function CheckOut() {
     const queryClient = useQueryClient()
     const { mutate, isPending, data } = useMutation({
          mutationFn: ClearCart,
          onSuccess: (data) => {
               toast.success("Cart is Empty")
               queryClient.invalidateQueries({ queryKey: ['cart'] })

          },
          onError: () => {
               toast.error('Login First')
          }
     })
     return (
          <button className='btn bg-main text-white min-w-[50px] md:min-w-[150px]' onClick={() => mutate()}>{isPending ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : 'Check Out'}</button>
     )
}
