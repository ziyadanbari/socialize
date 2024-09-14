import { LoadingIndicatorProps } from '@/types'
import React from 'react'



const LoadingCircle = ({size = 20,color,style}: LoadingIndicatorProps) => {
  return (
    <div className='flex items-center justify-center'>
        <span className='loader' style={{
            ...style,
            width:size,
            height:size,
            borderWidth: size / 9.6,
            borderColor:color,
            borderBottomColor: 'transparent'
        }} />
    </div>
  )
}

export default LoadingCircle