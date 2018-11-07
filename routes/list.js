const express = require('express');
const Promise = require('bluebird');
const router = express.Router();

const User = require('../models/user');
const List = require('../models/list');
const Task = require('../models/task');

router.post('/addlist', (req, res) => {
	const newList = new List({
		title: req.query.title,
		owner: req.query.userId
	});

	return Promise.all([
	  Promise.promisify(newList.save)(),
    Promise.promisify(
      User.findByIdAndUpdate)(req.query.userId, {$push: {list: newList._id}}, {safe: true, upsert: true})
  ])
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(500).send(err))
});

router.get('/:listId', (req, res) => {
	const list = List.where({_id: req.params.listId});
	return Promise.promisify(list.findOne)()
    .then(list => res.json(list))
    .catch(err => res.status(500).send(err))
});

router.delete('/:listId/removelist', (req, res) => {
  const list = List.where({_id: req.params.listId});
  return Promise.promisify(list.findOne)()
    .then(doc => {
      return Promise.all([
        Promise.all(
          doc.shared.map(user => Promise.promisify(
            User.findByIdAndUpdate)(user, {$pull: {shared: req.params.listId}})
          )
        ),
        Promise.all(
          doc.tasks.map(task => Promise.promisify(
            Task.findById)(task)
          )
        ),
        Promise.promisify(
          User.findByIdAndUpdate)(doc.owner, {$pull: {list: req.params.listId}}),
        Promise.promisify(list.remove)()
      ])
    })
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err))
});

router.put('/:listId/sharedList', (req, res) => {
  return Promise.promisify(User.findByIdAndUpdate)(req.query.userId, {$addToSet: {shared: req.params.listId}})
    .then(user => Promise.promisify(List.findByIdAndUpdate)(req.params.listId, {$addToSet: {shared: user._id}}))
    .catch(err => res.status(500).send(err))
});

module.exports = router;
