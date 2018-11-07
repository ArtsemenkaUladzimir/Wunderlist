const Promise = require('bluebird');
const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const List = require('../models/list');

router.get('/', (req, res) => {
  return Promise.promisify(List.findOne)({_id: req.query.listId})
    .then(list => {
      const tasks = list.tasks.map(item => ({task: item}));
      return Promise.promisify(Task.populate)(tasks, {path: 'task'})
    })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).send(err))
});

router.post('/addtask', (req, res) => {
	const newTask = new Task({
		owner: req.query.owner,
		content: req.query.content
	});

	return Promise.promisify(newTask.save)
    .then(() => Promise.promisify(
      List.findByIdAndUpdate)(req.query.listId, {$push: {tasks: newTask._id}}, {safe: true, upsert: true}))
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err))
});

router.delete('/removetask', (req, res) => {
  return Promise.all([
    Promise.promisify(Task.findByIdAndRemove)(req.query.taskId),
    Promise.promisify(Task.findByIdAndUpdate)(req.query.listId, {$pull: {tasks: req.query.taskId}})
  ])
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err))
});

module.exports = router;