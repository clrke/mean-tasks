'use strict';

var tasks = require('../controllers/tasks');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.task.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/tasks')
    .get(tasks.all)
    .post(auth.requiresLogin, tasks.create);
  app.route('/tasks/:taskId')
    .get(auth.isMongoId, tasks.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, tasks.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, tasks.destroy);

  // Finish with setting up the taskId param
  app.param('taskId', tasks.task);
};
