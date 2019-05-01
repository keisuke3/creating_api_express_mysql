import mutations from '../../../src/store/mutations'

const state = {
  todos: []
};

describe('store mutations.js', () => {
  it('The setTodos method', () => {
    const todoData = [
      {
        'id': 1,
        'title': 'testTitle1',
        'body': 'testBody1'
      }
    ];
    mutations.setTodos(state, todoData)
    expect(state.todos).toEqual([{ 'id': 1, 'title': 'testTitle1', 'body': 'testBody1' }])
  })

  it('The addTodo method', () => {
    const todoData = {
      'id': 2,
      'title': 'testTitle2',
      'body': 'testBody2'
    };
    mutations.addTodo(state, todoData)
    expect(state.todos[1]).toEqual({ 'id': 2, 'title': 'testTitle2', 'body': 'testBody2' })
  })

  it('The deleteTodo method', () => {
    const deleteData = {
      'id': 2,
      'title': 'testTitle2',
      'body': 'testBody2'
    }
    mutations.deleteTodo(state, deleteData)
    expect(state.todos).toEqual([{ 'id': 1, 'title': 'testTitle1', 'body': 'testBody1' }])
  })
})
