'use client'
import React from 'react'
import { Button } from './ui/button'
import GoogleIcon from './ui/google-icon'
import { signIn } from 'next-auth/react'

const SocialAuth = () => {
  return (
    <div>
        <Button className='gap-4' onClick={() => {
          signIn('google',{
            callbackUrl: "/"
          })
        }}>
            <div>
                <GoogleIcon/>
            </div>
            <div>
                Continue with Google
            </div>
        </Button>
    </div>
  )
}

export default SocialAuth