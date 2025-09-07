'use client'
import { verificationcode } from '@/apis/verificationcode'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { codeSchema, codeSchemaForm } from '@/schema/code.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function VerifyCodeForm() {
     const router = useRouter()

     const form = useForm<codeSchemaForm>({
          resolver: zodResolver(codeSchema),
          defaultValues: { resetCode: '' }
     })

     async function onSubmit(data: codeSchemaForm) {
          try {
               const res = await verificationcode(data)
               toast.success("✅ Code verified successfully!")
               console.log(res)
               if(res.status == 'Success'){
               router.push("/auth/reset-password")
               }
          } catch (err: any) {
               toast.error("❌ Invalid or expired code")
          }
     }

     return (
          <div className='pl-5'>
               <h3 className="text-gray-700 text-2xl after:ml-0.5 before:text-main before:content-['|'] my-5">
                    Please enter the code sent to your email !!
               </h3>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] mx-auto mt-5'>
                         <FormField
                              control={form.control}
                              name="resetCode"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Verification Code:</FormLabel>
                                        <FormControl>
                                             <Input type='text' placeholder="Enter your code" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                   </FormItem>
                              )}
                         />

                         <Button
                              type='submit'
                              disabled={form.formState.isSubmitting}
                              variant={'secondary'}
                              className='bg-main mb-5 text-white block cursor-pointer min-w-[80px] hover:bg-main '
                         >
                              {form.formState.isSubmitting
                                   ? <i className="fa-solid fa-spinner fa-spin"></i>
                                   : 'Verify Code'}
                         </Button>
                    </form>
               </Form>
          </div>
     )
}
