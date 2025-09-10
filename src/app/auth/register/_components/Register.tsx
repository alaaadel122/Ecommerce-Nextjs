'use client'
import { Button } from '@/components/ui/button'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, registerSchemaForm } from '@/schema/register.schema'
import Link from 'next/link'
import { addUser } from '@/apis/register.api'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function Register() {
     const router = useRouter()

     const form = useForm<registerSchemaForm>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               name: '',
               email: '',
               password: '',
               rePassword: '',
               phone: ''
          }
     })

     async function onSubmit(data: registerSchemaForm) {
          try {
               const res = await addUser(data)

               if (res.token) {
                    // لو رجع توكن يبقى التسجيل نجح → نجرب نعمل login
                    const loginRes = await signIn("credentials", {
                         redirect: false,
                         email: data.email,
                         password: data.password,
                         callbackUrl: "/"
                    })

                    if (loginRes?.error) {
                         toast.error("خطأ في تسجيل الدخول بعد التسجيل")
                    } else {
                         toast.success("تم التسجيل والدخول بنجاح 🎉")
                         router.push("/") // أو أي صفحة تانية
                    }
               }
          } catch (error: any) {
               toast.error(error.message || "حصل خطأ أثناء التسجيل")
          }
     }

     return (
          <div className='w-2/3 mx-auto'>
               <h3 className='my-5 mx-2'>Register Now:</h3>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Name:</FormLabel>
                                        <FormControl>
                                             <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                             <Input type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                             <Input type='password' autoComplete='false' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="rePassword"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Re-Password:</FormLabel>
                                        <FormControl>
                                             <Input type='password' autoComplete='false' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Phone:</FormLabel>
                                        <FormControl>
                                             <Input type='phone' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />
                         <Button type='submit' variant={'secondary'} className='bg-main text-white block cursor-pointer min-w-[80px] hover:bg-main ml-auto'>{form.formState.isSubmitting
                                   ? <i className="fa-solid fa-spinner fa-spin"></i>
                                   : 'Register'}</Button>
                    </form>
               </Form>
               <div className='flex justify-end w-full mx-auto py-5 '>
                    <p>Already have an account ? <Link href={'/auth/login'} className='text-main text-xl '>Login</Link></p>
               </div>
          </div>
     )
}
