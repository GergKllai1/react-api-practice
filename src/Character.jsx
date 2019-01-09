import React, { Component } from 'react'
import axios from 'axios';

class Character extends Component {
    constructor() {
        super();
        this.state = {
            trigger: '',
            character : [],
            homeworld : [],
            films: []
        }
    }

    async getCharacter(char) {
        const response = await axios.get('https://swapi.co/api/people/' + char);
        return response.data;
    }

    async getHomeworld(homeworld) {
        const response = await axios.get(homeworld);
        return response.data;
    }

    async getFilm(film) {
        const response = await axios.get(film);
        return response.data
    }

    async setFilms(character) {
        const filmlinks = character.films
        let films
        for (let i=0; i < filmlinks.length; i++){
            let film = await this.getFilm(i);
            films.push(film);
        }
        return films;
    }


    async getAndUpdateData(newTrigger) {
        const newCharacter = await this.getCharacter(newTrigger);
        const newHomeWorld = await this.getHomeworld(newCharacter.homeworld);
        const films = await this.setFilms(newCharacter);
        this.setState({character: newCharacter});
        this.setState({homeworld: newHomeWorld});
        this.setState({trigger: newTrigger});
        this.setState({films: films})
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
        return(
            <div>
                <button onClick={() => this.previousCharacter()}>Previous Character</button>
                <button onClick={() => this.nextCharacter()}>Next Character</button>
                <h1>Name:</h1>
                <h2>{this.state.character.name}</h2>
                <p>Gender: {this.state.character.gender}</p>
                <p>Height: {this.state.character.height}</p>
                <p>Weight: {this.state.character.mass}</p>
                <p>Birthday: {this.state.character.birth_year}</p>
                <p>Homeworld : {this.state.homeworld.name} </p>
            </div>
            
        )
    }
}

export default Character