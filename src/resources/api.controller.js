const Todo = require('../models/index').Todo;

module.exports = {

  async getTodos(req, res) {
    try {
      const todos = await Todo.findAll({
        order: [['title', 'ASC']]
      });
      res.status(200).json(todos);
    } catch (error) {
      res.json(error);
    }
  },
  postTodo(req, res) {
    res.status(200).send('create todos to DB');
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