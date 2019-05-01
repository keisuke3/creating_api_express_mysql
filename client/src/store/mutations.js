export default {
  setTodos(state, todoData) {
    state.todos = todoData
  },
  //Todoの新規作成
  addTodo(state, todoData) {
    state.todos.push(todoData)
  },
  deleteTodo(state, deleteData) {
    const deleteIndex = state.todos.findIndex((todo) => todo.id === deleteData.id);
    state.todos.splice(deleteIndex, 1)
  }
}