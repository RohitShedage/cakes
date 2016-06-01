var mongoose = require('mongoose');

module.exports = mongoose.model('Cake', {
	cakeId: String,
	title: String,
	weight: String,
	price: Number
});