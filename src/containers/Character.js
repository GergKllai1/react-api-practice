import React, { Component } from 'react'
import axios from 'axios';
import FilmList from '../components/Films/FilmList';
import Navigation from '../components/Navigation/Navigation';
import CharacterCard from '../components/Character/CharacterCard';
import Loading from '../components/Loading/Loading';

class Character extends Component {
  state = {
    trigger: '',
    character: [],
    homeworld: [],
    films: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.getAndUpdateData(1)
  }

  async getCharacter(char) {
    const response = await axios.get('https://swapi.co/api/people/' + char);
    return response.data;
  }

  async getData(data) {
    const response = await axios.get(data);
    return response.data;
  }

  async setFilms(character) {
    const filmlinks = character.films
    let films = [];
    for (let item of filmlinks) {
      await this.getData(item)
        .then((result) => {
          films.push(result)
        })
    };
    return films;
  }

  async getAndUpdateData(newTrigger) {
    const newCharacter = await this.getCharacter(newTrigger);
    const newHomeWorld = await this.getData(newCharacter.homeworld);
    const films = await this.setFilms(newCharacter);
    this.setState({
      character: newCharacter,
      homeworld: newHomeWorld,
      trigger: newTrigger,
      films: films,
      loading: false
    })
  }

  nextCharacter() {
    const newTrigger = this.state.trigger + 1;
    this.setState({ loading: true })
    this.getAndUpdateData(newTrigger);
  }

  previousCharacter() {
    const newTrigger = this.state.trigger - 1;
    this.setState({ loading: true })
    this.getAndUpdateData(newTrigger);
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Loading /> :
          <div>
            <Navigation
              next={() => this.nextCharacter(this.state.trigger)}
              previous={() => this.previousCharacter(this.state.trigger)}
            />
            <CharacterCard
              character={this.state.character}
              homeworld={this.state.homeworld}
            />
            <FilmList films={this.state.films} />
          </div>
        }
      </div>
    )
  }
}

export default Character