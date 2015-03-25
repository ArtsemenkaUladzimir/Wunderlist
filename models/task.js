var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
	owner: String,
	content: String
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;