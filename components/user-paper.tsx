import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { UserProfile } from '@/types'

const UserPaper = ({user}: {user: Pick<UserProfile, "username" | "profilePic">}) => {
  return (
    <div className="w-full flex items-center space-x-2 hover:bg-muted-foreground/30 p-3 rounded-md cursor-pointer">
      <Avatar className="h-10 w-10" >
        <AvatarImage src={user.profilePic || ""}/>
      </Avatar>
      <div>
        <div className="w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">{user.username}</div>
      </div>
    </div>
  )
}

export default UserPaper