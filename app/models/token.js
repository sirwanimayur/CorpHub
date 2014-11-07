var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TokenSchema   = new Schema({
	tokenId: String,
	email: String,
	createdAt: Date,
	updatedAt: Date
});

module.exports = mongoose.model('Token', TokenSchema);