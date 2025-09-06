'use client'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function Favorite({ productId }: { productId: string }) {
  const queryClient = useQueryClient()

  // ✅ 1. fetch wishlist
  const { data: wishlist } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch('/api/wishlist', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch wishlist ❌')
      return res.json()
    }
  })

  // ✅ 2. check if product exists
  const isInWishlist = wishlist?.data?.some((item: any) => item._id === productId)

  // ✅ 3. toggle mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (productId:string) => {
      if (isInWishlist) {
        // 🔴 remove → productId في الـ URL
        const res = await fetch(`/api/removeWishList/${productId}`, {
          method: 'DELETE',
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to remove ❌')
        }
        return res.json()
      } else {
        // 🟢 add → body JSON
        const res = await fetch('/api/addWishList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to add ❌')
        }
        return res.json()
      }
    },
    onSuccess: (data) => {
      toast.success(
        data?.message ||
          (isInWishlist ? 'Removed from wishlist ❌' : 'Added to wishlist ✅')
      )
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong ❌')
    },
  })

  // ✅ 4. UI
  return (
    <button
      className="mt-5 pl-3"
      disabled={isPending}
      onClick={() => mutate(productId)}
    >
      {isPending ? (
        <i className="fa-solid fa-spinner fa-spin text-main"></i>
      ) : (
        <i
          className={`fa-solid fa-heart ${
            isInWishlist ? 'text-red-700' : 'text-main'
          }`}
        ></i>
      )}
    </button>
  )
}
