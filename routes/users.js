const Promise = require('bluebird');
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const List = require('../models/list');
const Task = require('../models/task');

router.get('/', (req, res) => {
  return Promise.promisify(User.find)()
    .then(res.json)
    .catch(err => res.status(500).send(err))
});

router.get('/:userId', (req, res) => {
	const user = User.where({_id: req.params.userId});
	return Promise.promisify(user.findOne)()
    .then(res.json)
    .catch(err => res.status(500).send(err))
});

module.exports = router;
