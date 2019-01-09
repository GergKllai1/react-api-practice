import React, { Component } from 'react'
import axios from 'axios';

class Character extends Component {
    constructor() {
        super();
        this.state = {
            characters : []
        }
    }

    componentDidMount() {
        axios.get('https://swapi.co/api/people/1')
        .then(response => {
            this.setState({
                characters: response.data
            })
        })
    }

    render() {
        return(
            <p>{this.state.characters.name}</p>
        )
    }
}

export default Character