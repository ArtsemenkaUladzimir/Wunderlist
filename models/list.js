const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
	title : String,
	tasks: [String],
	shared: [String],
	owner: String
});
const List = mongoose.model('List', listSchema);

module.exports = List;
