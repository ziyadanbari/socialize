import React from 'react'

const Explore = () => {
  return (
    <div>
        {Array.from({length:50}).map((_,i) => <div key={i}>Explore</div>)}
    </div>
  )
}

export default Explore