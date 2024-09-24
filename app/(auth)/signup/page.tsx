'use client'
import Loading from '@/components/loading'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Redirect = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/signup/1")
    },[router])
  return <Loading/> 
}

export default Redirect