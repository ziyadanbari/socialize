'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

const Home = () => {
  const {toast} = useToast()
  useEffect(() => {
    toast({
      title: "test",
    })
  },[])
  return (
    <div>
      <Button variant={"destructive"} onClick={() => {
        signOut({
          redirect: false,
          callbackUrl: "/signin"
        })
      }}>Logout</Button>
    </div>
  )
}

export default Home