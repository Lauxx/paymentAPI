var React = require('react');
var ReactDOM = require('react-dom');
var AllAnimals = require('./allAnimals.js');

var AnimalApp = React.createClass({

	getInitialState: function(){
		return {
			animals: []
		}
	},

	getAllAnimalsFromServer: function(){
		var self = this;
		$.ajax({
			url: '/animals',
			method: 'GET'
		}).done(function(data){
			self.setState({animals: data})
		})
	},

	componentDidMount: function(){
		this.getAllAnimalsFromServer();
	},


	render: function(){
		return this.state.animals ? <AllAnimals animals={ this.state.animals } /> : null;
	}
});



ReactDOM.render(
  <AnimalApp />,
  document.getElementById('root')
);