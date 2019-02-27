import React from 'react'
import Film from './Film';

const FilmList = (props) => {
  return (
    <div>
      {props.films.length > 0 ? props.films.map(film => {
        return <Film key={film.episode_id} title={film.title}/>
      }) : null}
    </div>
  )
}

export default FilmList
