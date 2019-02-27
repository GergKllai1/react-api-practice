import React from 'react'

const Film = (props) => {
  return (
    <div id={props.key}>
      {props.title}
    </div>
  )
}

export default Film
