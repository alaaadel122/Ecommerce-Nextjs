'use client'
import { addProduct } from '@/app/shoppingCart/_actions/addProduct.action'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify';

export default function AddToCartBtn({ productId }: { productId: string }) {
  const { data, isError, error, mutate, isSuccess,isPending } = useMutation({
    mutationFn: async (id: string) => {
      return await addProduct(id) // نادى الـ server action بنفسك
    }, onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong ❌')
    }
  })

  return (
    <Button className='btn btn-main hover:scale-100 mt-5 min-w-[120px]' onClick={() =>  mutate(productId)}>{isPending ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add to cart'}</Button>
  )
}
