var Cake = require('../models/Cake'),
multer  =   require('multer'),
path = require('path'),
fs = require('fs');


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, req.params.cakeId);
  }
});

var upload = multer({ storage : storage}).single();


module.exports.listAll = function getOrders(req, res){
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
