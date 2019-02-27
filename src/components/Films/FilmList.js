import React from 'react'
import Film from './Film';

const FilmList = (props) => {
  return (
    <div>
      <h3>Film appearances:</h3>
      <div>
        {props.films.length > 0 ? props.films.map(film => {
          return <Film key={film.episode_id} title={film.title} />
        }) : null}
      </div>
    </div>
  )
}

export default FilmList
