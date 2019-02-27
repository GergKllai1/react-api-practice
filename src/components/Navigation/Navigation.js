import React from 'react'

const Navigation = (props) => {
  return (
    <div>
      <button onClick={() => props.previus()}>Previous Character</button>
      <button onClick={() => props.next()}>Next Character</button>
    </div>
  )
}

export default Navigation
