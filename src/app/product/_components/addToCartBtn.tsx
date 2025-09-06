'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

export default function AddToCartBtn({ productId , onSuccess ,label}: { productId: string, onSuccess?: () => void ,label:string}) {
  const queryClient = useQueryClient()
  const { data, isError, error, mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/addProductCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.message || 'Failed to add product')
      }

      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to cart ✅')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      onSuccess?.()
    },
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong ❌')
    },
  })


  return (
    <Button className='btn btn-main hover:scale-100 mt-5 min-w-[120px]' onClick={() => mutate(productId)}>{isPending ? <i className="fa-solid fa-spinner fa-spin"></i> : label}</Button>
  )
}
