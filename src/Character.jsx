import React, { Component } from 'react'
import axios from 'axios';

class Character extends Component {
    constructor() {
        super();
        this.state = {
            trigger: 1,
            character : []
        }
    }

    updateCharacter(character) {
        this.setState({character: character})
    }

    updateTrigger(trigger) {
        this.setState({trigger: trigger})
    }

    async getCharacter(char) {
        const response = await axios.get('https://swapi.co/api/people/' + char);
        return response.data;
    }

    async componentDidMount() {
        const character = await this.getCharacter(1)
        this.updateCharacter(character)
    }

    async getAndUpdateData(newTrigger) {
        const newCharacter = await this.getCharacter(newTrigger)
        this.updateCharacter(newCharacter)
        this.updateTrigger(newTrigger)
    }

    nextCharacter() {
        const newTrigger = this.state.trigger + 1
        this.getAndUpdateData(newTrigger)
    }

    previousCharacter() {
        const newTrigger = this.state.trigger - 1
        this.getAndUpdateData(newTrigger)
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
            </div>
            
        )
    }
}

export default Character