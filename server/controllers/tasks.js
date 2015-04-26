'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  _ = require('lodash');


/**
 * Find task by id
 */
exports.task = function(req, res, next, id) {
  Task.load(id, function(err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Failed to load task ' + id));
    req.task = task;
    next();
  });
};

/**
 * Create an task
 */
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.user = req.user;

  task.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the task'
      });
    }
    res.json(task);

  });
};

/**
 * Update an task
 */
exports.update = function(req, res) {
  var task = req.task;

  task = _.extend(task, req.body);

  task.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the task'
      });
    }
    res.json(task);

  });
};

/**
 * Delete an task
 */
exports.destroy = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the task'
      });
    }
    res.json(task);

  });
};

/**
 * Show an task
 */
exports.show = function(req, res) {
  res.json(req.task);
};

/**
 * List of Tasks
 */
exports.all = function(req, res) {
  Task.find().sort('-created').populate('user', 'name username').exec(function(err, tasks) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the tasks'
      });
    }
    res.json(tasks);

  });
};
