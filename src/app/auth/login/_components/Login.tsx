'use client'
import { Button } from '@/components/ui/button'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaForm } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
export default function Login() {
     const form = useForm<loginSchemaForm>({
          resolver: zodResolver(loginSchema),
          defaultValues: {
               email: '',
               password: ''
          },

     })
     const firstError = Object.keys(form.formState.errors)[0]
     async function onSubmit(data: loginSchemaForm) {
          const res = await signIn('credentials', {
               email: data.email,
               password: data.password,
               redirect: true,
               callbackUrl: '/'
          })
          console.log("=========", res)
          if (res?.ok) {
               window.location.href = res?.url || ''
          } else {
               console.log(res?.error)
          }
     }
     return (
          <div className='w-2/3 mx-auto h-[50vh]'>
               <h3 className='my-5 mx-2'>Login Now:</h3>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                         <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                             <div>
                                                  <Input type='email' {...field} />
                                             </div>
                                        </FormControl>
                                        {firstError == 'email' && <FormMessage />}
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
                                             <div>
                                                  <Input type='password' autoComplete='false' {...field} />
                                             </div>
                                        </FormControl>
                                        {firstError == 'password' && <FormMessage />}
                                   </FormItem>
                              )}
                         />

                         <Button type='submit' variant={'secondary'} className='bg-main mb-5 text-white block cursor-pointer min-w-[80px] hover:bg-main ml-auto'>
                              {form.formState.isSubmitting
                              ? <i className="fa-solid fa-spinner fa-spin"></i>
                              : 'Login'}</Button>
                    </form>
               </Form>
               <div className='flex justify-between w-full mx-auto py-5 '>
                    <p className=''><Link href={'/auth/register'} className=''>Forget Password?</Link></p>
                    <p className=''>Create  account ? <Link href={'/auth/register'} className='text-main text-xl '>Register</Link></p>
               </div>
          </div>
     )
}
