import React, { Component } from 'react'
import axios from 'axios';
import FilmList from './components/Films/FilmList';

class Character extends Component {
    state = {
            trigger: '',
            character : [],
            homeworld : [],
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
        for (let item of filmlinks ) {
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
        this.setState({character: newCharacter});
        this.setState({homeworld: newHomeWorld});
        this.setState({trigger: newTrigger});
        this.setState({films: films});
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
                <h3>Film appearances:</h3>
                <div>
                    <FilmList films={this.state.films}/>
                </div>
            </div>
            
        )
    }
}

export default Character