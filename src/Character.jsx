import React, { Component } from 'react'
import axios from 'axios';

class Character extends Component {
    constructor() {
        super();
        this.state = {
            trigger: 1,
            new : '',
            characters : []
        }
    }

    getCharacter(char) {
        axios.get('https://swapi.co/api/people/' + char)
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
    }
    componentDidMount() {
        this.getCharacter(1)
    }

    increaseTrigger() {
        this.new = this.state.trigger + 1
        this.setState({trigger: this.new})
        this.getCharacter(this.new)
    }

    decreaseTrigger() {
        this.new = this.state.trigger -1
        this.setState({trigger: this.new}) 
        this.getCharacter(this.new)
    }

    render() {
        return(
            <div>
                <button onClick={() => this.decreaseTrigger()}>Previous Character</button>
                <button onClick={() => this.increaseTrigger()}>Next Character</button>
                <h1>Name:</h1>
                <h2>{this.state.characters.name}</h2>
                <p>Gender: {this.state.characters.gender}</p>
                <p>Height: {this.state.characters.height}</p>
                <p>Weight: {this.state.characters.mass}</p>
                <p>Birthday: {this.state.characters.birth_year}</p>
            </div>
            
        )
    }
}

export default Character