//creating a new schema - database blueprint

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = new Schema({//calling 'new' - constructor function; new instance of schema 
	species: String,
	name: String, 
	age: Number, 
	color: String, 
	gender: String,
	image: String,
	price: Number,
	currency: String
});

module.exports = mongoose.model('Animals', AnimalSchema);
//creating a new model/blueprint to constitue what makes up an otter
//best practice - every model gets it's own file