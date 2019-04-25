export default {
  getTodos(state, todoData) {
    state.todos = todoData
  },
  //Todoの新規作成
  addTodo(state, todoData) {
    state.todos.push(todoData)
  }
}