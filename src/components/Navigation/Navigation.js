import React from 'react'

const Navigation = (props) => {
  return (
    <div>
      <button className='btn-info m-2 p-2 rounded btn-lg'
        onClick={() => props.previus()}
      >Previous Character</button>
      <button className='btn-info m-2 p-2 rounded btn-lg'
        onClick={() => props.next()}
      >Next Character</button>
    </div>
  )
}

export default Navigation
