var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function (req, res) {
	var newUser = new User({
		userName : req.query.username,
		userEmail : req.query.useremail
	});

	newUser.save(function (err, newuser) {
		if (err) {
			return console.log('err');
		}
		res.location('users');
		res.sendStatus(200);
	});
});


module.exports = router;
