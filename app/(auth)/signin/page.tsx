'use client'
import { signInSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

type FormType = z.infer<typeof signInSchema>

const SignIn = () => {
  const {toast} = useToast()
  const form = useForm<FormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading,setIsLoading] = useState(false)

  async function onSubmit(values: FormType) {
    try{
    setIsLoading(true)
    const response = await signIn('credentials',{...values,redirect:false,callbackUrl: "/"})
    if (response?.ok) return toast({
      title: "Welcome back!"
    });
    if (!response?.ok && response?.error) {
      return form.setError('password', { message: response?.error });
    }
    if (response?.ok) {
      return toast({
        title: "Cannot logged you in!",
        variant: "destructive"
      })
    }
    }catch(error) {
      toast({
        title: "Something went wrong!",
        variant: "destructive"
      })
    }finally {
      setIsLoading(false)
    }

  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={isLoading} type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn