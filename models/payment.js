//creating a new schema - database blueprint

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({//calling 'new' - constructor function; new instance of schema 
	supportedMethods: ['basic-card'],
	data: {
	supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['debit', 'credit'],
	},
	paymentDetails: {
		label: String,
		amount:{
		  currency: String,
		  value: Number
		}
	}
});

module.exports = mongoose.model('Payments', PaymentSchema);
//creating a new model/blueprint to constitue what makes up an otter
//best practice - every model gets it's own file