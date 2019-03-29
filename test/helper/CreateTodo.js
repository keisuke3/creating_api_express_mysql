class CreateTodo {
  constructor() {
    this.title = this.string();
    this.body = this.string();
    this.completed = this.bool();
  }

  string() {
    return Math.random().toString(36).slice(-8);
  }

  bool() {
    return !Math.floor(Math.random() * 2);
  }
}

module.exports = CreateTodo;