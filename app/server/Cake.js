var Cake = require('../models/Cake');

module.exports.listAll = function getOrders(req, res){
	console.log("Someone Calling listAll");
	Cake.find({}, function(err, results){
		return res.json(results);
	});
}

module.exports.fetch = function getOrder(req, res){
	Cake.find({cakeId: req.params.cakeId}, function(err, results){
		return res.json(results);
	});
}

module.exports.create = function createCake(req, res){
	var cake = new Cake(req.body);
	cake.save(function(err, result){
		return res.json(result);
	});
}
