import React from 'react'

const CharacterCard = (props) => {
  return (
    <div>
      <h1>Name:</h1>
      <h2>{props.character.name}</h2>
      <p>Gender: {props.character.gender}</p>
      <p>Height: {props.character.height}</p>
      <p>Weight: {props.character.mass}</p>
      <p>Birthday: {props.character.birth_year}</p>
      <p>Homeworld : {props.homeworld.name} </p>
    </div>
  )
}

export default CharacterCard
