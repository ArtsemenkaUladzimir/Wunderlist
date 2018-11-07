const Promise = require('bluebird');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
	const newUser = new User({
		userName : req.query.username,
		userEmail : req.query.useremail
	});

	return Promise.promisify(newUser.save)()
    .then(() => res.status(200).location('users'))
    .catch(err => res.status(500).send(err))
});


module.exports = router;
