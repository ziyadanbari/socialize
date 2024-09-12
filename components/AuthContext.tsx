"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const AuthContext = ({children}: {children: ReactNode}) => {
  return (  
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthContext