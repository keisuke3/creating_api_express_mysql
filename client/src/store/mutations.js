export default {
  setTodos(state, todoData) {
    state.todos = todoData;
  },
  //Todoの新規作成
  addTodo(state, todoData) {
    state.todos.push(todoData);
  },
  deleteTodo(state, deleteData) {
    const deleteIndex = state.todos.findIndex((todo) => todo.id === deleteData.id);
    state.todos.splice(deleteIndex, 1);
  },
  updateTodo(state, editData) {
    const updateIndex = state.todos.findIndex((todo) => todo.id === editData.id);
    state.todos[updateIndex].title = editData.title;
    state.todos[updateIndex].body = editData.body;
  },
  switchCompleted(state, index) {
    state.todos[index].completed = !state.todos[index].completed;
  }
};