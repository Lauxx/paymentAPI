var React = require('react');

var AnimalCard = React.createClass({

	render: function(){

		return (
			<div className="card-column">
				<div className="col-sm-4">
					<div className="card ">
						<div className="card-body well">
							<img className="stockPhoto" src={this.props.image}/>
							<h4 className="animalCard"> Name: { this.props.name }  </h4>
							<h4 className="animalCard"> Species: { this.props.species } </h4>
							<h4 className="animalCard"> Color: { this.props.color } </h4>
							<h4 className="animalCard"> Age: { this.props.age } </h4>
							<h4 className="animalCard"> Price: ${ this.props.price } </h4>
						</div>	
					</div>
				</div>
			</div>
			)
	}
});

module.exports = AnimalCard;