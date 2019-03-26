const index = require('../models/index');

module.exports = {

  async getTodos(req, res) {
    try {
      const todos = await index.Todo.findAll({
        order: [['id', 'ASC']]
      });
      res.status(200).json(todos);
    } catch (error) {
      res.json(error);
    }
  },
  async postTodo(req, res) {
    const transaction = await index.sequelize.transaction();
    try {
      const todo = await index.Todo.create({
        title: req.body.title,
        body: req.body.body,
        completed: req.body.completed
      },
        { transaction }
      );
      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.json(error);
    }
  },
  putTodo(req, res) {
    const id = req.params.id;
    const data = 'update todo of id:' + id + 'in DB';
    res.status(200).send(data);
  },
  deleteTodo(req, res) {
    const id = req.params.id;
    const data = 'delete todo of id:' + id + 'from DB';
    res.status(200).send(data);
  }
};