import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';
// import './JokeBoard.css';

const BASE_API_URL = "https://icanhazdadjoke.com/";

export default  class JokeBoard extends Component {
  constructor(props) {
		super(props);
		this.state = { 
			jokes: [] 
		};
		this.thumbsDown = this.thumbsDown.bind(this);
		this.thumbsUp = this.thumbsUp.bind(this);
		this.generateJokes = this.generateJokes.bind(this)

	};

// find joke by id and add one to netScore
thumbsUp(id, updatedScore){
	// console.log(updatedJoke)
	const updateJokes = this.state.jokes.map(joke => {
		if (joke.id === id) {
			return {...joke, netScore: updatedScore };
		}
		return joke
	})
	console.log('updateJokes',updateJokes)
	this.setState({ jokes: updateJokes })
}

// find joke by id and subtract one from netScore
thumbsDown(id, updatedScore){
	const updateJokes = this.state.jokes.map(joke => {
		if (joke.id === id) {
			return {...joke, netScore: updatedScore };
		}
		return joke
	})
	console.log('updateJokes',updateJokes)
	this.setState({ jokes: updateJokes })
}
// generate 10 jokes
async componentDidMount(){

	for(let i =0; i< 10; i++){
		const response = await axios.get(BASE_API_URL, {'headers': {"Accept": "application/json"}})
		let newJoke = {
			id: response.data.id,
			joke: response.data.joke,
			netScore: 0,
		}
		const jokes = [...this.state.jokes, newJoke]
		this.setState({jokes: jokes})
	}
}
generateJokes(){
	return(
	<div>
		{this.state.jokes.map( j =>
			<Joke 
			joke={j.joke}
			id={j.id}
			key={j.id}
			netScore={j.netScore}
			thumbsUp={this.thumbsUp}
			thumbsDown={this.thumbsDown}
			/>
			)}
	</div>
	)
}

render()
{
	return(
		<div>
			<h1> Please vote for jokes!</h1>
			{this.generateJokes()}
		</div>
	)
}
        
}
