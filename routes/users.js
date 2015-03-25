var express = require('express');
var router = express.Router();

var User = require('../models/user');
var List = require('../models/list');
var Task = require('../models/task');

router.get('/', function (req, res) {
	User.find(function (err, users) {
		if (err) res.send('err');
		res.json(users);
	});
});

router.get('/:userId', function (req, res) {
	var user = User.where({_id: req.params.userId});
	user.findOne(function (err, user) {
		if (err) res.send('err');
		res.json(user);
	});
});

router.delete('/:userId/deleteuser', function (req, res) {
	var count = 0;
	User.findOne({_id: req.params.userId}, function (err, user) {
		user.list.forEach(function (item) {
			var list = List.where({_id: item});
			list.findOne(function (err, doc) {
				var users = [];
				doc.shared.forEach(function (item) {
					users.push(item);
				});
				// console.log('users: ' + users);
				users.forEach(function (item, index) {
					User.findByIdAndUpdate(item, {$pull: {shared: doc._id}},
						function (err) {
							if (err) {
								console.log('trouble with userfindandupdate');
								res.sendStatus(500);
							}
						});
				});

				var tasks = [];
				doc.tasks.forEach(function (item) {
					tasks.push(item);
				});
				tasks.forEach(function (item) {
					Task.findByIdAndRemove(item, function () {
						if (err) {
							console.log('trouble task find and update');
							res.sendStatus(500);
						}
						else console.log('task removed');
					});
				});

				list.remove(function (err, list) {
					if (err) {
						console.log('trouble list remove');
						res.sendStatus(500);
					}
					count++;
					if (count >= user.list.length) removeUser();
				});

			});
		});
		
		if (count == user.list.length) removeUser();
		function removeUser () {
			user.remove(function (err) {
				if (err) res.send('err');
				else res.sendStatus(200);
			});
		}
	});
});

module.exports = router;
