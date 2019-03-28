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
  async updateTodo(req, res) {
    const transaction = await index.sequelize.transaction();
    const id = req.params.id;
    try {
      const todo = await index.Todo.findById(Number(id), { transaction });

      if (!todo) {
        throw new Error(`There is no todo corresponding to id ${req.body.id}`);
      }

      todo.update({
        title: req.body.title,
        body: req.body.body,
        completed: req.body.completed
      });
      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.status(404).json({ error: error.message });
    }
  },
  deleteTodo(req, res) {
    const id = req.params.id;
    const data = 'delete todo of id:' + id + 'from DB';
    res.status(200).send(data);
  }
};