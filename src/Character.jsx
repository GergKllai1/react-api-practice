import React, { Component } from 'react'
import axios from 'axios';
import FilmList from './components/Films/FilmList';
import Navigation from './components/Navigation/Navigation';
import CharacterCard from './components/Character/CharacterCard';

class Character extends Component {
  state = {
    trigger: '',
    character: [],
    homeworld: [],
    films: []
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
    this.setState({ character: newCharacter });
    this.setState({ homeworld: newHomeWorld });
    this.setState({ trigger: newTrigger });
    this.setState({ films: films });
  }

  async componentDidMount() {
    this.getAndUpdateData(1)
  }

  nextCharacter() {
    const newTrigger = this.state.trigger + 1;
    this.getAndUpdateData(newTrigger);
  }

  previousCharacter() {
    const newTrigger = this.state.trigger - 1;
    this.getAndUpdateData(newTrigger);
  }

  render() {
    return (
      <div>
        <Navigation
          next={() => this.nextCharacter(this.state.trigger)}
          previous={() => this.previousCharacter(this.state.trigger)}
        />
        <CharacterCard 
          character={this.state.character}
          homeworld={this.state.homeworld}
        />
        <div>
          <FilmList films={this.state.films} />
        </div>
      </div>

    )
  }
}

export default Character