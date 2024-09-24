'use client'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const {data} = useSession()
  const {user} = data || {}
  
  return (
    <div className='h-16 bg-white shadow sm:px-14 p-4 flex items-center'>
      <div className=' ml-auto'>
        <Avatar>
          <AvatarImage src={user?.profilePic}/>
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar