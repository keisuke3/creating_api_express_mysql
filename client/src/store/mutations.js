export default {
  setTodos(state, todoData) {
    state.todos = todoData
  },
  //Todoの新規作成
  addTodo(state, todoData) {
    state.todos.push(todoData)
  },
  deleteTodo(state, deleteId) {
    const deleteIndex = deleteId.id - 1;
    state.todos.splice(deleteIndex, 1)
  }
}