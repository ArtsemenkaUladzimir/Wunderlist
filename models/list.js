var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
	title : String,
	tasks: [String],
	shared: [String],
	owner: String
});

var List = mongoose.model('List', listSchema);

module.exports = List;