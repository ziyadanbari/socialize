'use client'
import Loading from '@/components/loading'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace("/explore")
    },[router])
  return (
    <Loading/>
  )
}

export default Home