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
export default function Register() {
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
                    // لو رجع توكن ممكن تسجّل دخوله على طول
                    await signIn("credentials", {
                         email: data.email,
                         password: data.password,
                         redirect: true,
                         callbackUrl: "/"   // يروح للهوم بعد اللوجين
                    })
               }
               } catch (error) {

                    console.log(error)
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
                                                  <div>
                                                       <Input  {...field} />
                                                       <p>{field.value}</p>
                                                  </div>
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
                                                  <div>
                                                       <Input type='email' {...field} />
                                                  </div>
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
                                                  <div>
                                                       <Input type='password' autoComplete='false' {...field} />
                                                  </div>
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
                                                  <div>
                                                       <Input type='password' autoComplete='false' {...field} />
                                                  </div>
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
                                                  <div>
                                                       <Input type='phone' {...field} />
                                                  </div>
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <Button type='submit' variant={'secondary'} className='bg-main text-white block cursor-pointer hover:bg-main ml-auto'>Register</Button>
                         </form>
                    </Form>
                    <div className='flex justify-end w-full mx-auto py-5 '>
                         <p className=''>Already have an account ? <Link href={'/auth/login'} className='text-main text-xl '>Login</Link></p>
                    </div>
               </div>
          )
     }
