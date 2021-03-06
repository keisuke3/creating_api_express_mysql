const express = require('express');
const router = express.Router();
const controller = require('./api.controller');

router
  .route('/todos')
  .get(controller.getTodos)
  .post(controller.postTodo);
router
  .route('/todos/:id')
  .put(controller.updateTodo)
  .delete(controller.deleteTodo);

module.exports = router;