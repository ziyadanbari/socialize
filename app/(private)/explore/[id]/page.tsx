'use client'
import { useParams } from 'next/navigation'

const PostPage = () => {
  const {id} = useParams()
  return (
    id
  )
}

export default PostPage