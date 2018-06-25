/*
React Hierarchy for this Application

Animal App
	All Animals
		Animal Card

*/

import React from "react";
import ReactDOM from "react-dom";
import AllAnimals from "./allAnimals.js";


class AnimalApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {animals: []};
	}

	getAllAnimalsFromServer(){
		var self = this;
		$.ajax({
			url: '/animals',
			method: 'GET'
		}).done(function(data){
			self.setState({animals: data})
		})
	}

	componentDidMount(){
		this.getAllAnimalsFromServer();
	}


	render(){
		return this.state.animals ? <AllAnimals animals={ this.state.animals } /> : null;
	}
}



ReactDOM.render(
  <AnimalApp />,
  document.getElementById('root')
);