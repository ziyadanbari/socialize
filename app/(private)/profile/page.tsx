'use client'
import Loading from '@/components/Loading'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Profile = () => {
  const {data} = useSession()
  const {user} = data || {}
  const router = useRouter()
  useEffect(() => {
    if (user?.id) {
      router.push(`/profile/${user.id}`)
    }
  },[user,router])
  return <Loading/>
}

export default Profile