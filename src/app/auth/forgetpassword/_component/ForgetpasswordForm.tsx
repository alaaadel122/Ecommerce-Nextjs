'use client'
import { forgetpassword } from '@/apis/forgetpassword'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { emailSchema, emailSchemaForm } from '@/schema/email.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'  
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ForgetpasswordForm() {
     const [emailError, setEmailError] = React.useState<string | null>(null)
     const router = useRouter()

     const form = useForm<emailSchemaForm>({
          resolver: zodResolver(emailSchema),
          defaultValues: { email: '' }
     })
     async function onSubmit(data: emailSchemaForm) {
          try {
               const res = await forgetpassword(data)
               // لو كل حاجة تمام
               setEmailError(null);
               toast.success(res.message || "✅ Check your email for reset instructions!");
               router.push("/auth/verifyCode")

          } catch (err: any) {
               // setEmailError(err.message || "Network error");
          }
     }
     return (
          <div className='pl-5'>
               <h3 className="text-gray-700 text-2xl after:ml-0.5 before:text-main before:content-['|'] my-5">Please write your email to verification  !!</h3>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-[80%] mx-auto mt-5'>

                         {/* Email */}
                         <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                             <Input type='email' {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                   </FormItem>
                              )}
                         />
                         <Button
                              type='submit'
                              variant={'secondary'}
                              className='bg-main mb-5 text-white block cursor-pointer min-w-[80px] hover:bg-main '
                         >
                              {form.formState.isSubmitting
                                   ? <i className="fa-solid fa-spinner fa-spin"></i>
                                   : 'Verify'}
                         </Button>
                         {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}

                    </form>
               </Form>

          </div>
     )
}
