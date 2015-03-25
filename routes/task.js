var express = require('express');
var router = express.Router();

var Task = require('../models/task');
var List = require('../models/list');

router.get('/', function (req, res) {
	List.findOne({_id: req.query.listId}, function (err, list) {
		if (err) res.sendStatus(500);
		var tasks = [];
		list.tasks.forEach(function (item) {
			tasks.push({task: item});
		})
		Task.populate(tasks, {path: 'task'}, function (err, tasks) {
			if (err) res.sendStatus(500);
			res.json(tasks);
		});
	});
});

router.post('/addtask', function (req, res) {
	var newTask = new Task({
		owner: req.query.owner,
		content: req.query.content
	});

	newTask.save(function (err) {
		if (err) res.sendStatus(500);
		List.findByIdAndUpdate(req.query.listId, {$push: {tasks: newTask._id}}, {safe: true, upsert: true}, 
			function (err) {
				if (err) res.sendStatus(500);
				else res.sendStatus(200);
		});
	});
});

router.delete('/removetask', function (req, res) {
	Task.findByIdAndRemove(req.query.taskId, function (err, task) {
		List.findByIdAndUpdate(req.query.listId, {$pull: {tasks: req.query.taskId}},
			function (err) {
				if (err) res.sendStatus(501);
				else res.sendStatus(200);
		});
	});
});

module.exports = router;