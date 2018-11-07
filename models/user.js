const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName : String,
	userEmail : String,
	list : [String],
	shared: [String]
});
const User = mongoose.model('User', userSchema);

module.exports = User;
