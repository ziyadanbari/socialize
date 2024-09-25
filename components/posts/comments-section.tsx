import { PostComment } from '@/types'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SendIcon } from 'lucide-react'
import { postComment } from '@/actions/postComment'
import { useToast } from '@/hooks/use-toast'
import { ActionError } from '@/utils/errors/serverAction.error'
import Comment from './comment'
interface Props {
  comments: PostComment[]
  postId: string
}

const CommentSection = ({comments: initialComments, postId}: Props) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<PostComment[]>(initialComments || [])
  const {toast} = useToast()
  console.log(comments)
  const submitComment = async () => {
    setLoading(true)
    try {
      const { posted, comment: newComment, error } = await postComment(postId, comment)
      if(posted) {
        setComment('')
        return setComments([newComment!, ...comments]) // Update comments state
      }
      throw new ActionError(error!)
    } catch (error) {
      toast({
        title: error instanceof ActionError ? error.actionError : "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setLoading(false) // Set loading to false when request is complete
    }
  }

  return (
    <div className='h-full flex flex-col gap-3 py-2 px-3'>
      <div className='flex-1 flex flex-col gap-2 md:min-h-0 min-h-[200px]'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      </div>
      <div className='flex items-center gap-2 '>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Add a comment...'
        />
        <Button size={"icon"} onClick={submitComment} loading={loading}> {/* Pass loading state to Button */}
          <SendIcon size={16}/>
        </Button>
      </div>
    </div>
  )
}

export default CommentSection