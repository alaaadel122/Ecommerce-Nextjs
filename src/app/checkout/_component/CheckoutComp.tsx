'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addressSchemaForm } from '@/schema/address.schema'
import React from 'react'
import { useForm } from 'react-hook-form'
import { checkoutOnline } from '../_actions/addaddress.action'

export default function CheckoutComp({cartId}:{cartId:string}) {

     const form = useForm({
          defaultValues:{
               details:'',
               city:'',
               phone:''
          }
     })
    async function onSubmit(data:addressSchemaForm) {
          const shippingAddress = data
          const res = await checkoutOnline(cartId,'',shippingAddress)
          return res
     }
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3 mx-auto">
                    <FormField
                         control={form.control}
                         name="details"
                         render={({ field }) => (
                              <FormItem>
                                   <FormLabel>Address Details:</FormLabel>
                                   <FormControl>
                                        <Input placeholder="address" {...field} />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name="city"
                         render={({ field }) => (
                              <FormItem>
                                   <FormLabel>City:</FormLabel>
                                   <FormControl>
                                        <Input placeholder="city" {...field} />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name="phone"
                         render={({ field }) => (
                              <FormItem>
                                   <FormLabel>Phone:</FormLabel>
                                   <FormControl>
                                        <Input type='tel' placeholder="phone" {...field} />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
                    <Button type='submit' className='bg-main'>Submit</Button>
               </form>
          </Form>

     )
}
