import { PostComment } from '@/types'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { getDeltaTime } from '@/utils/getDeltaTime'

const Comment = ({comment}: {comment: PostComment}) => {
  return (
    <div className='flex items-start gap-2'>
        <div>
            <Avatar className='w-6 h-6'>
                <AvatarImage src={comment?.user?.profilePic || ""}/>
            </Avatar>
        </div>
        <div className="flex flex-col gap-1">
            <div className='flex gap-1 items-center'>
                <div className='text-sm font-medium'>{comment?.user?.username}</div>
                <div className='text-xs text-muted-foreground'>{getDeltaTime(comment?.createdAt)}</div>
            </div>
            <div className='text-sm'>{comment?.comment}</div>
        </div>
    </div>
  )
}

export default Comment