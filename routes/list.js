var express = require('express');
var router = express.Router();

var User = require('../models/user');
var List = require('../models/list');
var Task = require('../models/task');

router.post('/addlist', function (req, res) {
	var newList = new List({
		title: req.query.title,
		owner: req.query.userId
	});
	
	newList.save(function (err, list) {
		if (err) return console.log('err');
		User.findByIdAndUpdate(req.query.userId, {$push: {list: newList._id}}, {safe: true, upsert: true},
	 		function (err, doc	) {
				if (err) console.log('err');
				else res.sendStatus(200);
		});
	});
});

router.get('/:listId', function (req, res) {
	var list = List.where({_id: req.params.listId});
	list.findOne(function (err, list) {
		if (err) console.log('err');
		else res.json(list);
	});
});

router.delete('/:listId/removelist', function (req, res) {
	var list = List.where({_id: req.params.listId});
	list.findOne(function (err, doc) {
		// console.log(doc);
		var users = [];
		doc.shared.forEach(function (item) {
			users.push(item);
		});
		// console.log(users);
		users.forEach(function (item) {
			User.findByIdAndUpdate(item, {$pull: {shared: req.params.listId}},
				function (err) {
					if (err) res.sendStatus(500);
					else console.log('shared list in users removed');
				});
		});

		var tasks = [];
		doc.tasks.forEach(function (item) {
			tasks.push(item);
		});
		tasks.forEach(function (item) {
			Task.findByIdAndRemove(item, function () {
				if (err) res.sendStatus(500);
				else console.log('task removed');
			});
		});

		User.findByIdAndUpdate(doc.owner, {$pull: {list: req.params.listId}},
			function (err) {
				if (err) res.sendStatus(500);
				else console.log('owners removed list');
			});

		list.remove(function (err, list) {
			if (err) res.sendStatus(500);
			else res.sendStatus(200);
		});
	});
});

router.put('/:listId/sharedList', function (req, res) {
	console.log(req.query.userId);
	console.log(req.params.listId);
	User.findByIdAndUpdate(req.query.userId, {$addToSet: {shared: req.params.listId}},
		function (err, user) {
			if (err) console.log('err');
			else {
				List.findByIdAndUpdate(req.params.listId, {$addToSet: {shared: user._id}},
					function (err) {
						if (err) res.sendStatus(500);
						else res.sendStatus(200);
					});
			}
		});
});

module.exports = router;