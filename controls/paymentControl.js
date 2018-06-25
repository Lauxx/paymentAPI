var PaymentModel = require('../models/payment.js');

module.exports = {

	create: function(req, res, next){

		var payment = new PaymentModel(req.body);
		payment.save(function(err, result){
			if(err){
				res.send(err);
				console.log("Error: " + err);
			} else {
				res.send(result);
			}
		});

	}, 

}