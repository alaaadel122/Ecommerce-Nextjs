'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaForm } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Login() {
     const router = useRouter();
     const [loginError, setLoginError] = React.useState<string | null>(null)

     const form = useForm<loginSchemaForm>({
          resolver: zodResolver(loginSchema),
          defaultValues: { email: '', password: '' }
     })

     async function onSubmit(data: loginSchemaForm) {
          const res = await signIn('credentials', {
               email: data.email,
               password: data.password,
               redirect: false,   // ❗️ خليها false
          })
          if (res?.ok) {
               router.push('/')
          } else {
               setLoginError(res?.error || 'Login failed ❌')
          }
     }

     return (
          <div className='w-2/3 mx-auto h-[50vh]'>
               <h3 className='my-5 mx-2'>Login Now:</h3>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

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

                         {/* Password */}
                         <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                   <FormItem className='my-5'>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                             <Input type='password' autoComplete='off' {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                   </FormItem>
                              )}
                         />

                         <Button
                              type='submit'
                              variant={'secondary'}
                              className='bg-main mb-5 text-white block cursor-pointer min-w-[80px] hover:bg-main ml-auto'
                         >
                              {form.formState.isSubmitting
                                   ? <i className="fa-solid fa-spinner fa-spin"></i>
                                   : 'Login'}
                         </Button>
                         {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}

                    </form>
               </Form>

               <div className='flex justify-between w-full mx-auto py-5'>
                    <p><Link href={'/auth/forgetpassword'}>Forget Password?</Link></p>
                    <p>Create account? <Link href={'/auth/register'} className='text-main text-xl'>Register</Link></p>
               </div>
          </div>
     )
}
