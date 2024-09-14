'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const Home = () => {
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