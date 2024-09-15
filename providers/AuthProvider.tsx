"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const AuthProvider = ({children}: {children: ReactNode}) => {
  return (  
    <SessionProvider refetchInterval={5 * 60}>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider