'use client'
import { addProduct } from '@/app/shoppingCart/_actions/addProduct.action'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify';

export default function AddToCartBtn({ productId }: { productId: string }) {
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
        throw new Error(err.error || 'Something went wrong')
      }
      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to cart ✅')
      queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong ❌')
    },
  })


  return (
    <Button className='btn btn-main hover:scale-100 mt-5 min-w-[120px]' onClick={() => mutate(productId)}>{isPending ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to cart'}</Button>
  )
}
