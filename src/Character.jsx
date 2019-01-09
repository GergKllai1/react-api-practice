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

    componentDidMount() {
        axios.get('https://swapi.co/api/people/' + this.state.trigger)
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
    }

    increaseTrigger() {
        this.new = this.state.trigger + 1
        this.setState({trigger: this.new})
        axios.get('https://swapi.co/api/people/' + this.new)
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
    }

    decreaseTrigger() {
        if(this.trigger > 1){
            this.setState({trigger: this.state.trigger + 1}) 
        }
    }

    render() {
        return(
            <div>
                <button onClick={() => this.decreaseTrigger()}>Previous Character</button>
                <p>{this.state.characters.name}</p>
                <button onClick={() => this.increaseTrigger()}>Next Character</button>
            </div>
            
        )
    }
}

export default Character